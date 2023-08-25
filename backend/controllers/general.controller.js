
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// get config vars
dotenv.config();

const generateAccessToken=(username)=> {
    return jwt.sign({username}, process.env.TOKEN_SECRET, { expiresIn:  '20h' });
  }
  


  const createDirectory =(dirPath)=>{
  
   fs.mkdir(dirPath, {recursive:true}, (err)=>{
    if (err) console.log(`Error creating directory: ${err}`)
    return dirPath;
    // Directory now exists.
  }) 
  
  return dirPath;
  }



  const AuthenticateToken =(req, res, next)=> {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.send({type:'error', message:'You are not authorised to perform such transaction'})
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) return  res.send({type:'error', message:'Token expired, please login and try again'})
  
      next()
    })
  }



  const getJWTToken =(req, res)=>{
var token = generateAccessToken(req.body.username);
return res.send({type:'success',  jwt:token, expire:'20 hours'})  
}



  module.exports = {
    generateAccessToken,
    createDirectory,
    getJWTToken,
    AuthenticateToken
  
  };
  