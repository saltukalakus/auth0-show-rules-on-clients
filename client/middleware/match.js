var mm = require('micromatch');

/*
context.clientName  == aa
context.clientID ==== aa
context.clientName  !== aa
context.clientName === aa
context.clientName !!= aa
*/

module.exports = function(script, client) {
    console.log(mm(['context.clientName  == aa',
        'context.clientID ==== aa',
        'context.clientName  !== aa',
        'context.clientName  === aa',
        'context.clientID  === aa',
        'context.clientName  === aa'],
        '*context.{clientName,clientID}*{==,===,!==,!=}*aa'));
    return true;
}