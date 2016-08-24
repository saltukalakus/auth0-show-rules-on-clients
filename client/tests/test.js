var test = require('tape');
var isFound = require('../middleware/match.js');
var fs = require('fs');
var path = require('path');

test("Double quota clientID", function(t) {
    t.plan(1);
    var client = {id:'3wgXJTZpOPobwfQl8EeAHPsxYpKRdP5B', 'name': 'Default App'};
    var filename = path.resolve(__dirname, './fixture/ok/case_1.js');
    var content = fs.readFileSync(filename, "utf8");
    t.ok(isFound( content, client), 'Double quota clientID');
});

test("Single quota clientName", function(t) {
    t.plan(1);
    var client = {id:'3wgXJTZpOPobwfQl8EeAHPsxYpKRdP5B', 'name': 'Default App'};
    var filename = path.resolve(__dirname, './fixture/ok/case_2.js');
    var content = fs.readFileSync(filename, "utf8");
    t.ok(isFound( content, client), 'Single quota clientName');
});

test("Malformed but valid comparison for ClientID", function(t) {
    t.plan(1);
    var client = {id:'3wgXJTZpOPobwfQl8EeAHPsxYpKRdP5B', 'name': 'Default App'};
    var filename = path.resolve(__dirname, './fixture/ok/case_3.js');
    var content = fs.readFileSync(filename, "utf8");
    t.ok(isFound( content, client), 'Malformed but valid comparison for ClientID');
});


test("Malformed but valid comparison for ClientName", function(t) {
    t.plan(1);
    var client = {id:'3wgXJTZpOPobwfQl8EeAHPsxYpKRdP5B', 'name': 'Default App'};
    var filename = path.resolve(__dirname, './fixture/ok/case_4.js');
    var content = fs.readFileSync(filename, "utf8");
    t.ok(isFound( content, client), 'Malformed but valid comparison for ClientName');
});