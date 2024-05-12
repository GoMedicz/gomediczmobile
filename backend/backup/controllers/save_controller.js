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

function generateAccessToken(username) {
  return jwt.sign({username}, process.env.TOKEN_SECRET, { expiresIn:  '12h' });
}

function createDir(dirPath){


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






module.exports.createNewAccount = (app, connection)=>{
  app.post('/save_controller/create_new_user',  (req, res)=>{

     var data = req.body 


     var values = [data.code, data.fullname, data.email, data.telephone, bcrypt.hashSync(data.password, 10), '', '[]', '', today, 'Inactive', 'Online' ]
     
     var sql = `INSERT INTO tbl_customers (code,	fullname,	email,	telephone,	password,	gender,	location,	passport,	dateCreate,	accountStatus,	userStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;



     var sqlotp = `INSERT INTO tbl_otp (pin, userCode, expiry, status) VALUES (?, ?, ?, ?) `;

    var input = [data.pin, data.code, todayTime, 'Active'];

     connection.getConnection(function(err, con) {
      if(err){
          return JSON.stringify(err, null, 2)
      }else{               
     con.query(sql, values,(err, result)=>{
     // con.release();
                     if(err){
                         return res.send({type:'error', message:JSON.stringify(err, undefined, 2)})
                     }else{

                      //save otp here 
                     con.query(sqlotp, input,(err, result)=>con.release())

                         return res.send({type:'success', message:'Account successfully created'})
                     }
                 })
                }
              })
 }) 
}







module.exports.loginUser =(app, connection)=>{

  app.post('/login_controller/login_user', (req, res)=>{
    var data = req.body 
    var sql = 'Select code, email, password from tbl_customers where email =? and accountStatus ="Active" Limit 1';

     connection.getConnection(function(err, con) {
      if(err){
         return JSON.stringify(err, null, 2)
      }else{
               con.query(sql, [data.email], (err, result)=>{ 
             con.release();

             
if(result.length !==0){ 

         var compare = bcrypt.compareSync(data.password, String(result[0].password));
                     if(err){
                         return res.send(JSON.stringify(err, null, 2))
                     }else if(compare===true){ 
                  
                      var token = generateAccessToken(result[0].code);
                  return res.send({type:'success', code:result[0].code,  jwt:token, message:'You have successfully login'})
                  }else{
                         return res.send({type:'error', message:'it looks like these are not your correct details'})
                     }  

               }else{
              return res.send({type:'error', message:'it looks like these are not your correct details'})

                  }  


                 })  
                } 
              })     
 }) 
}



