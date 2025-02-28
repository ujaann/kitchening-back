const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
  //After space eg: Bearer "token" so
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }
  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Credentials" });
  }
}

function authorizeRole(req,res,next,role) {
        if(req.user.role!==role){
            return res.status(403).send("Access Denied:Insufficient Permissions")
        }
        next();
}


module.exports={authenticateToken,authorizeRole};