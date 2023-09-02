
var multer  = require('multer')
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// get config vars
dotenv.config();


const generateAccessToken=(username)=> {
    return jwt.sign({username}, process.env.TOKEN_SECRET, { expiresIn:  '20h' });
  }
  

  const generateWallet=(t=8)=>{
    t||(t=16);
    for(var e="",a=0;a<t;a++){
      var n=Math.floor(Math.random()*"1234567890".length);
      e+="1234567890".substring(n,n+1)
      }
     
      return e
  }


  const createDirectory =(dirPath)=>{
  
   fs.mkdir(dirPath, {recursive:true}, (err)=>{
    if (err) console.log(`Error creating directory: ${err}`)
    return dirPath;
    // Directory now exists.
  }) 
  
  return dirPath;
  }


const uploadProductImage =(req, res, next)=>{
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/images/products/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname)
    }
  })
  var upload = multer({ storage: storage, limits:{
    fieldSize: 25 * 1024 * 1024
  } }).single('image_file')
  next() 
}

  const AuthenticateToken =(req, res, next)=> {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.send({type:'error', message:'You are not authorised to perform such transaction'})
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) return  res.send({type:'error', message:'Token expired, please login and try again'})
  
      next()  //sends request to the next middleware if any
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
    AuthenticateToken,
    generateWallet,
    uploadProductImage
  
  };
  