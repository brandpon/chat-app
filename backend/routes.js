const router = require('express').Router();

router.route(/users,userRouter)

app.use('/api', userRouter);

// Use this middleware to protect routes
app.use(protectedRoute);

// Legacy code
app.use('/api/chatrooms', protectedRoute, chatroomRouter);
app.use('/api/users-old', protectedRoute, userOldRouter);


app.use('/api/test', protectedRoute2);

module.exports = router;
