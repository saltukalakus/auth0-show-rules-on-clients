## Auth0 List Rules on Clients Extension

If you are already using [Auth0](https://auth0.com) services, you should be familiar with [Auth0](https://auth0.com)'s 
management dashboard, clients (A.K.A. applications) and rules. This little extensions extends the management dashboard 
and helps you to view relation between clients and rules.

[PUT PICTURE HERE]

## Installation
1. Go to [Auth0 Extensions](https://manage.auth0.com/#/extensions)
2. Click on `+ Create Extension`
3. Fill in the textbox with `https://github.com/saltukalakus/auth0-list-rules-on-clients`
4. Click on `continue`
5. Finally, click on `install`

## Features (I may move to TODO some of them. They are target now)
* Rules view lists clients for each rule.
* Clients view lists rules for each client.
* Clickable rules & clients details in each view mode.
* Filter, search based on rules and clients.
* Export rule-client table as CSV file. 
* Covers a lot of possible whitelist rules with tests. Please check "Supported List of Valid Whitelists" section below. 

## How It Works
In [Auth0](https://auth0.com) dashboard, enabled rules are applied on every client by default. However, it is quite
logical to add some white list logic to the beginning of the rule scripts so that particular rules are applied only to 
some selected clients. Below you can find alternative two ways of coding this type of rules. So if all or some of your rules 
have this kind of whitelist logic, this add-on will happily detect and show rules vs clients relation correctly.

### Rule type - 1
Skip code if the client is not in whitelist

```javascript
function (user, context, callback) {
    if (context.clientName === 'Client1ToWhiteList') || 
       (context.clientName === 'Client2ToWhiteList') ||
       (context.clientName === 'Client3ToWhiteList'){
       
        // write actual rule logic in this block
    }
    
    // If 'If' block is not hit, rule just returns without any action  
    callback(null, user, context);
}
```

### Rule type - 2
Early return if the client is not in whitelist

```javascript
function (user, context, callback) {
    if (context.clientName !== 'Client1ToWhiteList') && 
       (context.clientName !== 'Client2ToWhiteList') &&
       (context.clientName !== 'Client3ToWhiteList') {
       
        // returns without any ruleaction  
        return callback(null, user, context);
    }
    
    // write actual rule logic after this line
    
    callback(null, user, context);
}
```

## Limitations
If any of your rules has some kind of blacklist logic, extension will not be able to list the relations correctly for that rule.

Another important limitation is if you are using logic whitelist similar logic to implement some partially applied 


## Supported List of Valid Whitelists



## Development
Fork the project in GitHub

### Local test

### Remote test
Don't forget to commit ./build/bundle.js 

## TODO
* Dynamically evaluate rule's code with some clever algorithm to detect behaviour. So that mixture of whitelist, 
blacklist or even whitelist like logic won't produce false positives.

## People
[R. Saltuk Alakus](https://github.com/saltukalakus)

## License
[MIT](LICENSE)