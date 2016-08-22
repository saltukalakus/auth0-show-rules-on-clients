require('es6-promise').polyfill();
require('isomorphic-fetch');

$(window).ready(function() {
    var getClients = fetch('https://saltuka.auth0.com/api/v2/clients', {
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