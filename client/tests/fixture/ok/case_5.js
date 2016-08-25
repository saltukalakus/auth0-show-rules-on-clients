function (user, context, callback) {

    // Esoteric characters check
    var myString="''™™¡¡##$$∞∞§§{{[[]]}}\\≠≠!!''^^++%%&&//(())==??__ÜÜ;;ŞŞĞĞÇÇÖÖ::>><<||~~¨¨``æ´´≥≥≤≤éé";

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