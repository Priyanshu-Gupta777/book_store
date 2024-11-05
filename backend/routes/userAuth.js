const jwt = require('jsonwebtoken');

const secretKey = 'bookstore123';

const authenticateToken = (req,res,next) => {
  const authHeader = req.headers['authorization'];
  
  const token = authHeader && authHeader.split(" ")[1];

  if(token == null){
    return res.json({message : 'Authentication token required'});
  }

  jwt.verify(token,secretKey, (err,user) =>{
    if(err){
        return res.status(403).json({message:'Token expired'});
    }
    req.user = user;
    next();
  })
}

module.exports = {authenticateToken};