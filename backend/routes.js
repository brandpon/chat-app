const router = require('express').Router();

module.exports = function(app, passport){

    const userRouter = require('./api/routes/users');
    const chatroomRouter = require('./api/routes/chatrooms');
    const adminRouter = require('./api/routes/admin');
    const userOldRouter = require('./api/routes/users-old');
    const isAdmin = require('./lib/isAdmin');

    const protectedRoute = passport.authenticate('jwt', {session: false});
    // const adminRoute = passport.authenticate('jwt', {session: false}, (req, res, next) => {
    //     if (req.user && req.user.admin === true){
    //         next();
    //     } else {
    //         res.status(401).json("Not admin");
    //     }
    // });

    // const adminRoute = passport.authenticate('jwt', {session: false}, (req, res, next) => {
    //     console.log(req);
    //     return res.status(200).json({success: true});
    // });

    app.use('/api/users', userRouter);
    app.use('/api/chatrooms', protectedRoute, chatroomRouter);

    // Change to admin route later
    app.use('/api/users-old', userOldRouter);
    app.use('/api/admin', [protectedRoute, isAdmin], adminRouter);

    // TEST ROUTE
    const testRouter = require('./api/routes/tester');
    app.use('/api/tester', protectedRoute, testRouter);

    return router;
}

// module.exports = router;