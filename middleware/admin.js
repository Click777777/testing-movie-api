const admin = (req, res, next) => {
  //401 unauthorized
  //403 forbidden
  if (!req.user.isAdmin)
    return res.status(403).send("Access Denide.Admin can only access");
  next();
};
module.exports = admin;
