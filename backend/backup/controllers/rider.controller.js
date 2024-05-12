const models = require('../models/index');
var multer  = require('multer')
const sequelize = require('../api/connection');
const bcrypt = require('bcrypt');

const { generateAccessToken } = require('./general.controller');
  const AddNewRider = (req, res, next) => {

var data = req.body 

const errors = {};
let formIsValid = true;

let msg ='Some fields are required';


if(!String(data.code).trim()){
    errors.code =msg;
    formIsValid = false;
} 


if(!String(data.fullName).trim()){
  errors.fullName =msg;
  formIsValid = false;
}

if(!String(data.email).trim()){
  errors.email =msg;
  formIsValid = false;
}


if(!String(data.phoneNumber).trim()){
  errors.phoneNumber =msg;
  formIsValid = false;
}


if(!formIsValid){
  return res.send({status:'error', statusCode:404, message:'Some fields are required'})
  }else{
    
    sequelize.sync().then(() => {

         models.Rider.create({
          code: data.code,
          fullname:data.fullName,
          email: data.email,
         telephone: data.phoneNumber,
         wallet: data.wallet,
         password: bcrypt.hashSync(data.password, 10),
          status: 'Active'

        }).then(result => {
      return res.send({type:'success', message:'Rider successfully register', status:200})

        }).catch((error) => {
         return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2), status:500})
        }); 

      }).catch((error) => {
        return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2), status:500})
      }); 
    }
};


  


const VerifyRider= (req, res, next) => {

  var data = req.body 
  sequelize.sync().then(() => {
    models.Rider.findOne({
     where: {
      [data.field]: data.data
 }
 }).then(result => {

  if(result){
    return res.send({type:'success', message:'Already registered', statusCode:200})
  }else{
    return res.send({type:'info', message:'User not found', statusCode:404})
  }
       
     }).catch((error) => {
      return res.send({type:'error', messageDetails:JSON.stringify(error, undefined, 2), message:'Internal Server Error', statusCode:500})
     });
   }).catch((error) => {
     return res.send({type:'error', message:JSON.stringify(error, undefined, 2), message:'Internal Server Error', statusCode:500})
   }); 
      
  };





    const getRiderProfile= (req, res, next) => {

      sequelize.sync().then(() => {
        models.Rider.findOne({
         where: {
         code: req.params.code
     }
     }).then(result => {
  
      if(result){
        return res.send({type:'success', data:result, statusCode:200})
      }else{
        return res.send({type:'error', data:[], statusCode:404})
      }
           
         }).catch((error) => {
          return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2), statusCode:404})
         });
       }).catch((error) => {
         return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2), statusCode:404})
       }); 
          
      };


const loginRider = (req, res, next) => {
  var data = req.body 
  sequelize.sync().then(() => {
       models.Rider.findOne({
        where: {
        telephone: data.telephone
    }
    }).then(result => {

    if(result){ 

 var compare = bcrypt.compareSync(data.password, String(result.password));
  
    if(compare==false){ 
      return res.send({type:'error', message:'it looks like these are not your correct details', statusCode:404})
              
           }else{
           
            var token = generateAccessToken(result.code);
            return res.send({type:'success', wallet:result.wallet, code:result.code, statusCode:200, token:token, message:'You have successfully login'});

              }  

        }else{
       return res.send({type:'error', statusCode:404, message:'it looks like these are not your correct details'})

           }  

        }).catch((error) => {
         return res.send({type:'error', statusCode:404, message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
        });
      }).catch((error) => {
        return res.send({type:'error', statusCode:404, message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
      }); 
  };




    const UpdateRider = (req, res, next) => {

      var data = req.body 
      
      const errors = {};
      let formIsValid = true;
      
      let msg ='Some fields are required';
      
      
if(!String(data.fullname).trim()){
  errors.fullname =msg;
  formIsValid = false;
}

if(!String(data.email).trim()){
  errors.email =msg;
  formIsValid = false;
}


if(!String(data.telephone).trim()){
  errors.telephone =msg;
  formIsValid = false;
}
      

      
      if(!formIsValid){
        return res.send({type:'error', statusCode:404, message:'Some fields are required'})
        }else{
      
      
      
          sequelize.sync().then(() => {
              models.Rider.update({
    
                image_url: data.image_url,
                fullname: data.fullname,
                email:data.email,
              telephone: data.telephone,
              

              },{
                where: {
                  code: data.code,
                }
              }).then(result => {
                return res.send({type:'success', message:'Rider successfully updated', statusCode:200})
      
              }).catch((error) => {
               return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
              });
      
            }).catch((error) => {
              return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
            }); 
          }
      };

 
      const UpdateField = (req, res, next) => {

        var data = req.body 
        
        const errors = {};
        let formIsValid = true;
        
        let msg ='Some fields are required';
        
        
        if(!String(data.code).trim()){
            errors.code =msg;
            formIsValid = false;
        } 
        
        if(!String(data.field).trim()){
          errors.field =msg;
          formIsValid = false;
      } 
      

      if(!String(data.data).trim()){
        errors.data =msg;
        formIsValid = false;
    } 

        
        if(!formIsValid){
          return res.send({status:'error', message:'Some fields are required'})
          }else{
        
            sequelize.sync().then(() => {
             
                 models.Rider.update({
                  [data.field]:data.data
                },{
                  where: {
                    code: data.code,
                  }
                }).then(result => {
              return res.send({type:'success', message:'Info updated', status:200})
        
                }).catch((error) => {
                 return res.send({type:'error',message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2), status:500})
                }); 
        
              }).catch((error) => {
                return res.send({type:'error', message:JSON.stringify(error, undefined, 2), status:500})
              }); 
            }
        };

      const getSummary = (req, res, next) => {

          sequelize.query(
          'SELECT r.fullname, r.online_status, r.image_url, r.code, 0 as order, 0 as amount from tbl_riders r where r.code =? ',
          {
            replacements: [req.params.code],
            type: sequelize.QueryTypes.SELECT
          }
      ).then(result => {
        if(result.length!==0 && Array.isArray(result)){
                return res.send({type:'success', data:result[0], statusCode:200})
        }
              }).catch((error) => {
               return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
              });
            
        };


module.exports = {
  AddNewRider,
getRiderProfile,
VerifyRider,
loginRider,
UpdateRider,
getSummary,
UpdateField
};
