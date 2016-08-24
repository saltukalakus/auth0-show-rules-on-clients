function (user, context, callback) {

    // Malformed but valid comparison for ClientID
    if(context.clientID
     ===
     '3wgXJTZpOPobwfQl8EeAHPsxYpKRdP5B'){

        var whitelist = [ 'saltukalakus@gmail.com']; //authorized users
        var userHasAccess = whitelist.some(
            function (email) {
                return email === user.email;
            });

        if (!userHasAccess) {
            return callback(new UnauthorizedError('Access denied.'));
        }
    }

    callback(null, user, context);
}