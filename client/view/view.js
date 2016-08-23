viewTemplate = require('../build/template/view.js');


module.exports = function(clients, rules, divItem) {
    var context = {title: 'saltuk'};
    var html = viewTemplate(context);
    console.dir(clients);
    console.dir(rules);
    $(divItem).html(html);

    var data = [
        {
            "name": "bootstrap-table",
            "id": "526",
            "rules": "122"
        },
        {
            "name": "multiple-select",
            "id": "288",
            "rules": "150"
        },
        {
            "name": "bootstrap-show-password",
            "id": "32",
            "rules": "11"
        },
        {
            "name": "blog",
            "id": "13",
            "rules": "4"
        }
    ];

    $('#table').bootstrapTable({
        data: data
    });
};
