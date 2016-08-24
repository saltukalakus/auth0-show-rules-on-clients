var viewTemplate = require('../build/template/view.js');
var tableGenerator = require('../middleware/generator');

window.onRuleButtonClick = function(code){
    alert(code);
    console.log("initial");
    console.log(code);
    var a = hljs.highlightBlock(code);
    console.log("higligted");
    console.log(a);
    //bootbox.alert(code);
}

module.exports = function(clients, rules, divItem) {
    var table = tableGenerator(clients, rules);

    var html = viewTemplate.render({'clients': table});
    $(divItem).html(html);

    $(document).ready(function() {
        $('#table').DataTable();
    } );
};
