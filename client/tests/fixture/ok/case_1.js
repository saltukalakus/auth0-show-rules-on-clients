function (user, context, callback) {

    // Double quota clientID check
    if(context.clientID !== "3wgXJTZpOPobwfQl8EeAHPsxYpKRdP5B"){
        return callback(null, user, context);
    }

    var whitelist = [ 'saltukalakus@gmail.com']; //authorized users
    var userHasAccess = whitelist.some(
        function (email) {
            return email === user.email;
        });

    if (!userHasAccess) {
        return callback(new UnauthorizedError('Access denied.'));
    }

    callback(null, user, context);
}