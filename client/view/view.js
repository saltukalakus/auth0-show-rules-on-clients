var viewTemplate = require('../build/template/view.js');
var modalTemplate = require('../build/template/modal.js');
var tableGenerator = require('../controller/generator');

window.onRuleButtonClick = function(code){
    var codeHtml = '<pre><code class="javascript">' + code +'</code></pre>'
    $('#full-width-rule-body').html(codeHtml);
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    }).promise().done($('#full-width').modal('show'));
}

module.exports = function(clients, rules) {
    var table = tableGenerator(clients, rules);

    var html = viewTemplate.render({'clients': table});
    $('#listView').html(html);

    var html = modalTemplate.render();
    $('#modalView').html(html);

    $(document).ready(function() {
        $('#table').DataTable();
    } );
};
