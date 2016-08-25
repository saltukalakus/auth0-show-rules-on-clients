function (user, context, callback) {

    // Context reversed ordered clientName
    if("Default App" !== context.clientName){
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