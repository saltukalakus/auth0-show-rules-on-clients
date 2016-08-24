var viewTemplate = require('../build/template/view.js');
var tableGenerator = require('../middleware/generator');

window.onRuleButtonClick = function(code){
    var codeHtml = '<pre><code class="javascript">' + code +'</code></pre>'
    bootbox.alert(codeHtml);
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });
}

module.exports = function(clients, rules, divItem) {
    var table = tableGenerator(clients, rules);

    var html = viewTemplate.render({'clients': table});
    $(divItem).html(html);

    $(document).ready(function() {
        $('#table').DataTable();
    } );
};
