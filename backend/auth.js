
 function isAuthenticated(req, res, next){
   if (req.isAuthenticated()){
     return next();
   } else {
     return res.status(400).json({success:false, error:'Not authenticated'});;
   }
 }

module.exports.isAuthenticated = isAuthenticated;
