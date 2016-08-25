var mm = require('micromatch');

module.exports = function(script, client) {
    /*
    console.log('*context.{clientName,clientID}*{==,===,!==,!=}*"'+client.id+'"*');
    */
    return mm.isMatch(script, '*3wgXJTZpOPobwfQl8EeAHPsxYpKRdP5B*');
}