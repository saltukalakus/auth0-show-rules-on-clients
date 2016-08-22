$(window).ready(function() {
    console.log('https://' + window.config.AUTH0_DOMAIN + '/api/v2/clients');

    $.when( $.ajax
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
            console.log(clients);
            console.log(rules);
        });
});