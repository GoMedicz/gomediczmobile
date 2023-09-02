
const bcrypt = require('bcrypt');
const models = require('../models/index');
const sequelize = require('../api/connection');
const { generateWallet, generateAccessToken } = require('./general.controller');


  const AddNewUser = (req, res, next) => {
   
  var data = req.body 
  const errors = {};
  let formIsValid = true;
  
  let msg ='Some fields are required';
  
  if(!String(data.code).trim()){
    errors.code =msg;
    formIsValid = false;
  }
  
  
  
  if(!String(data.fullname).trim()){
    errors.fullname =msg;
    formIsValid = false;
  }
  
  
  if(!String(data.email_address).trim()){
    errors.email_address =msg;
    formIsValid = false;
  }

  if(!String(data.telephone).trim()){
    errors.telephone =msg;
    formIsValid = false;
  }
  
  
  if(!formIsValid){
    return res.send({type:'error', message:'Some fields are required'})
    }else{


      //plese verify user telephone before saving
 sequelize.sync().then(() => {

       models.User.create({


          code: data.code,
          fullname:data.fullname,
          email_address: data.email_address,
          telephone: data.telephone,
          image_url: '',
          wallet: generateWallet(10),

          password: bcrypt.hashSync(data.password, 10),
          is_phone_verified: false,
          is_email_verified: false,
          status: 'Active',
          user_group: 'user',

        }).then(result => {
          return res.send({type:'success', message:'User successfully added'})
        }).catch((error) => {
         return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
        });
      }).catch((error) => {
        return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      }); 
    }
};




const getUsers = (req, res, next) => {
 
sequelize.sync().then(() => {
     models.User.findAll({
      where: {
      pharmacy_code: req.params.pharmacy_code
  }
  }).then(result => {
        return res.send({type:'success', data:result})
      }).catch((error) => {
       return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      });
    }).catch((error) => {
      return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
    }); 
};




const loginUser = (req, res, next) => {
  var data = req.body 

  
  sequelize.sync().then(() => {
       models.User.findOne({
        where: {
        telephone: data.telephone
    }
    }).then(result => {
      

    if(result){ 

 var compare = bcrypt.compareSync(data.password, String(result.password));
  
    if(compare==false){ 
      return res.send({type:'error', message:'it looks like these are not your correct details'})
              
           }else{
           

            var token = generateAccessToken(result.code);
                       return res.send({type:'success', code:result.code,  jwt:token, message:'You have successfully login'})
              }  

        }else{
       return res.send({type:'error', message:'it looks like these are not your correct details'})

           }  

        }).catch((error) => {
         return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
        });
      }).catch((error) => {
        return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      }); 
  };




module.exports = {
  AddNewUser,
  getUsers,
  loginUser
};
