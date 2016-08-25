## Auth0 Extension to List Rules on Clients

If you are already using [Auth0](https://auth0.com) services, you should be familiar with Auth0's management dashboard, clients (A.K.A. applications) and rules concepts. This little extension extends the management dashboard and helps you to view relation between clients and rules in more depth.

![ScreenShot](https://github.com/saltukalakus/auth0-list-rules-on-clients/blob/master/doc/ListRules.png)

## Try the Extension
1. Go to [Auth0 Extensions](https://manage.auth0.com/#/extensions)
2. Click on `+ Create Extension`
3. Fill in the textbox with `https://github.com/saltukalakus/auth0-list-rules-on-clients`
4. Click on `continue`
5. Finally, click on `install`

## Features
* View rules for every client.
* View rule's details in builtin Javascript code reader screen.
* Sort clients based on client name and rule. 
* Search and filter rules and clients.

## How It Works
In [Auth0 dashboard](https://manage.auth0.com) activated rules are applied on every client by default. However, it is reasonable to <b>apply some of the rules only to some of the whitelisted clients</b>. Writing clientID or clientName based whitelist logic in rules section of dasboard can make this possible. 

This extension fetches your client and rule list details via Auth0's management API. By analysing your rules, extension can determine which rules are used for any client and show the relation via a simple but effective user interface. 

For the extension application to show relations properly, your rules must match any of the below patterns.

1. context.clientName|clientID === | !== | == | != 'expectedID'|'name'
2. context['clientName'|'clientID'] === | !== | == | != 'expectedID'|'name'
3. 'expectedID'|'name' === | !== | == | != context.clientName|clientID
4. 'expectedID'|'name' === | !== | == | != context['clientName'|'clientID']

(\*) <b>|</b> symbol denotes alternative valid options. <br>
(\*) Space and double quotes are also supported in your whitelist expressions.

Sample for valid whitelist rule with skip code block if the client is not in whitelist.

```javascript
function (user, context, callback) {
    if (context.clientName === 'Client1ToWhiteList') || 
       ('Client2ToWhiteList' === context.clientName) ||
       (context['clientName'] === 'Client3ToWhiteList') || 
       (context.clientID === '3wgXJTZpOPobwfQl8EeAHPsxYpKRdP5B') {
       
        // Write rule logic in this block
    }
    
    // If 'If' block is not hit, rule just returns without any action  
    callback(null, user, context);
}
```

Sample for valid whitelist rule with early return if the client is not in whitelist.

```javascript
function (user, context, callback) {
    if (context.clientName !== 'Client1ToWhiteList') && 
       ('Client2ToWhiteList' !== context.clientName) &&
       (context["clientName"] === 'Client3ToWhiteList') &&
       (context.clientID !== '3wgXJTZpOPobwfQl8EeAHPsxYpKRdP5B') {
       
        // Returns without any rule action  
        return callback(null, user, context);
    }
    
    // Write rule logic after this line
    
    callback(null, user, context);
}
```

If you need to compare clientName or clientID against some client for other purposes you can do it with variable assignment method like below example. This comparison will be ignored by the extension.

```javascript
function (user, context, callback) {
  
    // Do some rule checking
    
    // Checking ClientID with variable assignment will lead to extension to ignore the logic.
    var myClientID =  '3wgXJTZpOPobwfQl8EeAHPsxYpKRdP5B';
      
    if (context.clientID === myClientID) {
        // Your specific rule logic for client '3wgXJTZpOPobwfQl8EeAHPsxYpKRdP5B'
    }
    
    // Do some more rule checking
    callback(null, user, context);
}
```

## Limitations
If you have rules <b>applied on all clients other than a few blacklisted ones</b>, for that particular rules, extension will not be able to list the relations correctly.   

```javascript
function (user, context, callback) {
    if (context.clientName !== 'Client1ToBlackList') {
        // Writing rule logic after this line literally means, apply the rule to all clients 
        // other than Client1ToBlackList. However, extension will incorrectly think that this rule is applied
        // only to Client1ToBlackList
        
        return callback(null, user, context);
    }
    
    // Returns without any rule action 
    
    callback(null, user, context);
}
```
Using comparison operators (==, ===, !=, !==) with clientId or clientName against existing clients is not allowed other than whitelist type rule checking. Because this will mix with whitelist rule checking and cause incorrect relation. 

```javascript
function (user, context, callback) {
    // Do some rule checking
    
    if (context.clientName === 'Client2') {
       // In Client2 do some additional checking. This is also not allowed! Extension will 
       // think that this rule is applied only to Client2. Actually it is running for all clients.
    }
    
    // Do some more rule checking
    callback(null, user, context);
}
```

Your whitelist rules should stick with patterns described in <b>How It Works</b> section. Note that, there are many other ways for comparing clientId/Name in Javascript, but unsupported formats will cause the extension not to detect the whitelist rule. 

```javascript
function (user, context, callback) {

    // Checking ClientID with variable assignment will lead to extension to fail in matching
    var myClientID = '3wgXJTZpOPobwfQl8EeAHPsxYpKRdP5B';
    if (context.clientID === myClientID) {
        // Your rule logic
    }
    // Do some more rule checking
    callback(null, user, context);
}

function (user, ctx, callback) {

    // Extension search for keyword 'context' but 'ctx' is used and this cause extension 
    // to fail in matching
    if (ctx.clientName === 'Client2') {
        // Your rule logic
    }
    // Do some more rule checking
    callback(null, user, context);
}
``` 

## Development Setup
Fork the project in your GitHub account. Install <b>Node.js</b> and <b>npm</b>. Installation steps may change according to your operating system. After that follow the steps for local and remote tests as below.

### Local tests
* Copy sample_config.json as config.json in the same folder. Update AUTH0_DOMAIN setting in config.json with your domain information. You can find your domain information in [Clients]( https://manage.auth0.com/#/applications) section of your management dashboard.

```bash
    $ cp sample_config.json config.json
    $ cd ./client
    $ npm install
    $ cd ..
    $ npm install
```

* Build and run the application

```bash
    $ cd ./client
    $ npm run bundle
    $ cd ..
    $ npm start
```
### Remote tests

* Build the application

```bash
    $ cd ./client
    $ npm run bundle
    $ cd ..
    $ npm run bundle
```

* Deploy the application

Commit your changes to your GitHub account. Run your extension with your project's GitHub link following the <b>Try the Extension</b> section above.

## Developer Notes
Backend part of the application is mostly a reuse of [auth0-extension-boilerplate-with-react](https://github.com/saltukalakus/auth0-extension-boilerplate-with-react) project. Backend code helps to authenticate with Auth0 servers with required privileges (read access to client and rule API) and receive API token and API endpoint. Backend passes this information to frontend application. <b>[Frontend application](https://github.com/saltukalakus/auth0-list-rules-on-clients/tree/master/client)</b> makes the API calls, analyzes the received data and produces the list view. 

[Hogan.js](http://twitter.github.io/hogan.js/) is used in frontend application to generate dynamic Html. [Gulp.js](http://gulpjs.com/) is used to automate precompiling stage of Hogan templates into Javascript. With the help of [Browserify](http://browserify.org/) precompiled template file is merged into a single frontend application file. Later application file is inserted into html page via [Jade](http://jade-lang.com/) in backend code and later packaged as a bundle with [Webpack](https://webpack.github.io/).

Frontend logic is tested against alternative rules in this [directory](https://github.com/saltukalakus/auth0-list-rules-on-clients/tree/master/client/tests). [Tape]( https://github.com/substack/tape) test framework is used in tests.

```bash
    $ cd ./client
    $ npm run test
```

## Todo
* Dynamically evaluate rule's code with some clever algorithm to detect behaviour. So that whitelist and blacklist logic can be used together without limitation in rules.

## People
[R. Saltuk Alakus](https://github.com/saltukalakus)

## License
[MIT](LICENSE)
