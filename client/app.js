require('es6-promise').polyfill();
require('isomorphic-fetch');

$(window).ready(function() {
    console.log('https://' + window.config.AUTH0_DOMAIN + '/api/v2/clients');
    var getClients = fetch('https://' + window.config.AUTH0_DOMAIN + '/api/v2/clients', {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        },
        method: 'GET',
        cache: false
    });

    getClients.then(function (response) {
        response.json().then(function (foos) {
            console.log('the clients:', foos);
        });
    });
});