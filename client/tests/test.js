var test = require('tape');
var isFound = require('../utils/match.js');
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

test("Esoteric characters check", function(t) {
    t.plan(1);
    var client = {id:'3wgXJTZpOPobwfQl8EeAHPsxYpKRdP5B', 'name': 'Default App'};
    var filename = path.resolve(__dirname, './fixture/ok/case_5.js');
    var content = fs.readFileSync(filename, "utf8");
    t.ok(isFound( content, client), 'Esoteric characters check');
});

test("Property accessor for clientID check", function(t) {
    t.plan(1);
    var client = {id:'3wgXJTZpOPobwfQl8EeAHPsxYpKRdP5B', 'name': 'Default App'};
    var filename = path.resolve(__dirname, './fixture/ok/case_6.js');
    var content = fs.readFileSync(filename, "utf8");
    t.ok(isFound( content, client), 'Property accessor for clientID check');
});

test("Context reversed ordered clientID check", function(t) {
    t.plan(1);
    var client = {id:'3wgXJTZpOPobwfQl8EeAHPsxYpKRdP5B', 'name': 'Default App'};
    var filename = path.resolve(__dirname, './fixture/ok/case_7.js');
    var content = fs.readFileSync(filename, "utf8");
    t.ok(isFound( content, client), 'Context reversed ordered clientID check');
});

test("Context reversed ordered clientName check", function(t) {
    t.plan(1);
    var client = {id:'3wgXJTZpOPobwfQl8EeAHPsxYpKRdP5B', 'name': 'Default App'};
    var filename = path.resolve(__dirname, './fixture/ok/case_8.js');
    var content = fs.readFileSync(filename, "utf8");
    t.ok(isFound( content, client), 'Context reversed ordered clientName check');
});

test("Multiple clients in if statement with OR logic check", function(t) {
    t.plan(1);
    var client = {id:'3wgXJTZpOPobwfQl8EeAHPsxYpKRdP5B', 'name': 'Default App'};
    var filename = path.resolve(__dirname, './fixture/ok/case_9.js');
    var content = fs.readFileSync(filename, "utf8");
    t.ok(isFound( content, client), 'Multiple clients in if statement with OR logic check');
});

test("Multiple clients in if statement with AND logic check", function(t) {
    t.plan(1);
    var client = {id:'3wgXJTZpOPobwfQl8EeAHPsxYpKRdP5B', 'name': 'Default App'};
    var filename = path.resolve(__dirname, './fixture/ok/case_10.js');
    var content = fs.readFileSync(filename, "utf8");
    t.ok(isFound( content, client), 'Multiple clients in if statement with AND logic check');
});

test("Multiple clients double quote with OR logic should not match check", function(t) {
    t.plan(1);
    var client = {id:'3wgXJTZpOPobwfQl8EeAHPsxYpKRdP5B', 'name': 'Default App'};
    var filename = path.resolve(__dirname, './fixture/nok/case_1.js');
    var content = fs.readFileSync(filename, "utf8");
    t.notOk(isFound( content, client), 'Multiple clients double quote with OR logic should not match check');
});

test("Multiple clients double quote with AND logic should not match check", function(t) {
    t.plan(1);
    var client = {id:'3wgXJTZpOPobwfQl8EeAHPsxYpKRdP5B', 'name': 'Default App'};
    var filename = path.resolve(__dirname, './fixture/nok/case_2.js');
    var content = fs.readFileSync(filename, "utf8");
    t.notOk(isFound( content, client), 'Multiple clients in if statement with AND logic should not match check');
});

test("Multiple clients single quote with OR logic should not match check", function(t) {
    t.plan(1);
    var client = {id:'3wgXJTZpOPobwfQl8EeAHPsxYpKRdP5B', 'name': 'Default App'};
    var filename = path.resolve(__dirname, './fixture/nok/case_3.js');
    var content = fs.readFileSync(filename, "utf8");
    t.notOk(isFound( content, client), 'Multiple clients single quote with OR logic should not match check');
});