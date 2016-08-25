var view = require('../view/view.js');

module.exports = function() {
    $('#spinView').spin();
    $.when(
        $.ajax
        ({
            type: "GET",
            url: 'https://' + window.config.AUTH0_DOMAIN + '/api/v2/clients',
            dataType: 'json',
            data: '{}',
            beforeSend: function (xhr){
                xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
            }
        }),

        $.ajax
        ({
            type: "GET",
            url: 'https://' + window.config.AUTH0_DOMAIN + '/api/v2/rules',
            dataType: 'json',
            data: '{}',
            beforeSend: function (xhr){
                xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
            }
        })).done(function (clients, rules) {
            view(clients[0], rules[0]);
            $('#spinView').spin(false);
        }).fail(function (jqXHR, status) {
            sessionStorage.removeItem('token');
            $('#spinView').spin(false);
            bootbox.alert(status);
        });
}