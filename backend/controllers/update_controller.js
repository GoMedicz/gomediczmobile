var multer  = require('multer')
var today = new Date().toISOString().slice(0,10)

var todayTime = new Date().toISOString().slice(0,19)
const bcrypt = require('bcrypt');
var CryptoJS = require('crypto-js');
var os = require('os')
const fs = require('fs')
const mysqldump = require('mysqldump')

//var config = require('../api/config.json');
//var Importer = require('mysql-import')
//var importer =  new Importer(config)
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// get config vars
dotenv.config();

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const generateAccessToken=(username)=> {
  return jwt.sign({username}, process.env.TOKEN_SECRET, { expiresIn:  '5h' });
}

const createDir =(dirPath)=>{

 fs.mkdir(dirPath, {recursive:true}, (err)=>{
  if (err) console.log(`Error creating directory: ${err}`)
  // Directory now exists.
}) 

return dirPath;
}


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.send({type:'error201', message:'Token expired'})

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) return  res.send({type:'error201', message:'Token expired'})

    next()
  })
}

module.exports.frontToken =(app)=>{
    app.post('/get_front_token/tbl_token', (req, res)=>{
var token = generateAccessToken("req.body.user_login");
return res.send({type:'success',  jwt:token})       
   }) 
}



module.exports.updateUserAccount = (app, connection)=>{
  app.post('/update_controller/update_user_account',  (req, res)=>{

     var data = req.body 
     var values = [data.gender, data.gender+".png", data.code]
     
     var sql = `UPDATE tbl_customers set gender =?, passport=?, accountStatus="Active" where code =?`;

     connection.getConnection(function(err, con) {
      if(err){
          return JSON.stringify(err, null, 2)
      }else{               
     con.query(sql, values,(err, result)=>{
      con.release();
                     if(err){
                         return res.send({type:'error', message:JSON.stringify(err, undefined, 2)})
                     }else{

                         return res.send({type:'success', message:'Account successfully created'})
                     }
                 })
                }
              })
 }) 
}









