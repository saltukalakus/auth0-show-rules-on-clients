function (user, context, callback) {

    // Multiple clients in if statement with AND logic test
    if(context.clientID !== "3wgXJTZpOPobwfQl8EeAHPsxYpKRdP5B" &&
        context.clientID !== "3wgXJTZpOPobwfQl8EeAHPsxY6556666"  ){
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