var mm = require('micromatch');

module.exports = function(script, client) {

    // Simplify script by removing some items
    script = script.replace(/(\r\n|\n|\r)/gm,'') //return lines
        .replace(/ +?/g, '')                     //space
        .replace(/["']/g, '@')                   //replace quotes with @
        .replace(/\//g, '')                      //forward slash
        .replace(/\\/g, '')                      //backslash
        .replace(/[\[\]']+/g,'')                 //brackets
        .replace(/\./g,'');                      //dots

    // Return true if find a match
    return (mm.contains(script,
        'context{clientName,clientID,@clientName@,@clientID@}{==,===,!==,!=}{@'+client.id+'@,@'+client.name.replace(/ +?/g, '') + '@}'))
        || (mm.contains(script,
        '{@'+client.id+'@,@'+client.name.replace(/ +?/g, '') + '@}{==,===,!==,!=}context{clientName,clientID,@clientName@,@clientID@}'));
}