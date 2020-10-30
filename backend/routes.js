const router = require('express').Router();

module.exports = function(app, passport){

    const userRouter = require('./api/routes/users');
    const chatroomRouter = require('./api/routes/chatrooms');
    const userOldRouter = require('./api/routes/users-old');

    const protectedRoute = passport.authenticate('jwt', {session: false});

    app.use('/api/users', userRouter);
    app.use('/api/chatrooms', protectedRoute, chatroomRouter);

    // Change to admin route later
    app.use('/api/users-old', protectedRoute, userOldRouter);

    // TEST ROUTE
    const testRouter = require('./api/routes/tester');
    app.use('/api/tester', protectedRoute, testRouter);

    return router;
}

// module.exports = router;