var viewTemplate = require('../build/template/view.js');
var tableGenerator = require('../middleware/generator');

module.exports = function(clients, rules, divItem) {
    var table = tableGenerator(clients, rules);
    console.log(table);

    var html = viewTemplate.render({'clients': table});
    console.log(html);
    $(divItem).html(html);

    $(document).ready(function() {
        $('#table').DataTable();
    } );
};
