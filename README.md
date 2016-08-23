## Auth0 Extension to List Rules on Clients

If you are already using [Auth0](https://auth0.com) services, you should be familiar with [Auth0](https://auth0.com)'s 
management dashboard, clients (A.K.A. applications) and rules. This little extensions extends the management dashboard 
and helps you to view relation between clients and rules.

[PUT PICTURE HERE]

## Deploy the Extension
1. Go to [Auth0 Extensions](https://manage.auth0.com/#/extensions)
2. Click on `+ Create Extension`
3. Fill in the textbox with `https://github.com/saltukalakus/auth0-list-rules-on-clients`
4. Click on `continue`
5. Finally, click on `install`

## Features (I may move to TODO some of them. They are target now)
* View clients for each rule.
* View rules for each client.
* Clickable rule & client details in each view mode.
* Filter, search rules and clients.
* Export rules-clients table as a CSV file. 

## How It Works
In [Auth0](https://auth0.com) dashboard, activated rules are applied on every client by default. However, it is quite
reasonable to "apply some rules only to some of the clients" (whitelist). Implementing clientID or clientName based whitelist logic can make this possible. Extension assumes all or some of your rules have whitelist logic. By analysing your rules, extension can determine which rules are used for any client and show their relation via it's user interface. 

For the extension application to show relations properly, your rules must match any of the below patterns.

1. context.clientName|clientID === | !== | == | != 'expectedID'|'name'
2. context['clientName'|'clientID'] === | !== | == | != 'expectedID'|'name'
3. 'expectedID'|'name' === | !== | == | != context.clientName|clientID
4. 'expectedID'|'name' === | !== | == | != context['clientName'|'clientID']

(*) | symbol denotes alternative valid options. 
(*) Space and double quotes are also supported in your whitelist expression.

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
In your rules, if you have logic like "apply this rule if not these clients" (blacklist), this extension will not be able to list the relations correctly for that rules.   

```javascript
function (user, context, callback) {
    if (context.clientName !== 'Client1ToBlackList') {
        // Writing rule logic after this line literally means apply rule to all clients 
        // other than Client1ToBlackList. Extension will think that this rule is applied
        // only to Client1ToBlackList
        
        return callback(null, user, context);
    }
    
    // Returns without any rule action 
    
    callback(null, user, context);
}
```
Using comparison operators (==, ===, !=, !==) with clientId or clientName against existing clients is not allowed other than whitelist rule checking. Because this will mix with whitelist rule checking of the extension and cause incorrect relation. 

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

Your whitelist rules should stick with patterns described in "How It Works" section. Note that, there are many other ways for comparing clientId/Name in Javascript, but unsupported formats will cause the extension not to detect the whitelist rule. 

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

    // Extension search for keyword 'context' but 'ctx' is used and this cause extension to fail in matching
    if (ctx.clientName === 'Client2') {
        // Your rule logic
    }
    // Do some more rule checking
    callback(null, user, context);
}
``` 

## Development
Fork the project in your GitHub account. Install <b>Node.js</b> and <b>npm</b>. Installation steps differ 
according to your operating system. After that, follow the steps for local and remote tests as below.

### Local tests
* Copy sample_config.json as config.json in the same folder. Update AUTH0_DOMAIN setting in config.json with your domain path. It may be something like YourUserName.auth0.com Note that based on your account location auth0.com may not work for you. 

```bash
     $ cp sample_config.json config.json
     $ cd ./client
     $ npm install
     $ cd ..
     $ npm install
```

* Build and run the application

```bash
    $ npm start
```
### Remote tests

* Build the application

```bash
    $ npm run bundle
```

* Deploy the application

Commit your changes to your GitHub account. Run your extension following <b>Deploy the Extension</b> section above.

## TODO
* Dynamically evaluate rule's code with some clever algorithm to detect behaviour. So that mixture of whitelist, 
blacklist logics can be handled without limitation.

## People
[R. Saltuk Alakus](https://github.com/saltukalakus)

## License
[MIT](LICENSE)
