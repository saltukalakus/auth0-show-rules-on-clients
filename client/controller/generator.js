var isFound = require('../utils/match.js');

module.exports = function(clients, rules) {
    var table = [];

    for (var rule in rules) {

        // Is there any match for this rule boolean
        var anyMatch = false;

        for (var client in clients) {

            // Populate the table array items for the current client
            table[client] = table[client] || {};
            table[client].id = table[client].id || clients[client].client_id;
            table[client].name = table[client].name || clients[client].name;
            table[client].rules = table[client].rules || [];

            // Is client id or client name in current rule script?
            if (isFound(rules[rule].script, table[client])) {

                // We found at least one match which means this is a client specific rule.
                anyMatch = true;

                table[client].rules.push( {'enabled':(rules[rule].enabled),
                    'id': rules[rule].id,
                    'name': rules[rule].name,
                    'script': rules[rule].script,
                    'generic': false
                })
            }
        }

        if (!anyMatch) {
            // This is a generic rule. It needs to be inserted in all clients
            for (var client in clients) {
                table[client].rules.push({'enabled': (rules[rule].enabled),
                    'id': rules[rule].id,
                    'name': rules[rule].name,
                    'script': rules[rule].script,
                    'generic': true
                })
            }
        }
    }
    // Return the array of client [id, name, array of matching rule [id, name, enabled, script, generic] ]
    return table;
}