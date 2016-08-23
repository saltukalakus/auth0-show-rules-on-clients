viewTemplate = require('../build/template/view.js');

module.exports = function(clients, rules, domItem) {
    var context = {title: 'saltuk'};
    var html = viewTemplate(context);
    console.log(html);
    console.dir(clients);
};
