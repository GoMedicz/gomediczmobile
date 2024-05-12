
const models = require('../models/index');
const sequelize = require('../api/connection');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateWallet } = require('./general.controller');


  const addNewStore = (req, res, next) => {
  
  var data = req.body 
    
  const errors = {};
  let formIsValid = true;
  
  let msg ='Some fields are required';
  
  if(!String(data.code).trim()){
    errors.code =msg;
    formIsValid = false;
  }
  
  
  
  if(!String(data.store_name).trim()){
    errors.store_name =msg;
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

  const wallet = generateWallet(10)
 sequelize.sync().then(() => {
       models.Store.create({
          code: data.code,
          image_url: '',
          store_name:data.store_name,
          telephone: data.telephone,

          wallet: wallet,
          password: bcrypt.hashSync(data.password, 10),
          email_address: data.email_address,
          address: data.address,
          latitude: data.latitude,
          longitude: data.longitude,

        }).then(result => {
          var token = generateAccessToken(data.code);

          return res.send({type:'success', jwt:token, wallet:wallet, message:'Vendor successfully added'})

        }).catch((error) => {
         return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
        });
      
      }).catch((error) => {
        return res.send({type:'error',  message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
      }); 
    }
};


const VerifyVendor= (req, res, next) => {

  var data = req.body 
  sequelize.sync().then(() => {
    models.Store.findOne({
     where: {
      [data.field]: data.data
 }
 }).then(result => {

  if(result){
    return res.send({type:'success', message:'Already registered', status:200})
  }else{
    return res.send({type:'info', message:'User not found', status:404})
  }
       
     }).catch((error) => {
      return res.send({type:'error', messageDetails:JSON.stringify(error, undefined, 2), message:'Internal Server Error', status:500})
     });
   }).catch((error) => {
     return res.send({type:'error', message:JSON.stringify(error, undefined, 2), message:'Internal Server Error', status:500})
   }); 
      
  };


const getVendorByPhone= (req, res, next) => {

  sequelize.sync().then(() => {
    models.Store.findOne({
     where: {
      telephone: req.params.telephone
 }
 }).then(result => {

  if(result){
    return res.send({type:'success', message:'Already registered', status:200})
  }else{
    return res.send({type:'info', message:'User not found', status:404})
  }
       
     }).catch((error) => {
      return res.send({type:'error', messageDetails:JSON.stringify(error, undefined, 2), message:'Internal Server Error', status:500})
     });
   }).catch((error) => {
     return res.send({type:'error', message:JSON.stringify(error, undefined, 2), message:'Internal Server Error', status:500})
   }); 
      
  };

const getStores = (req, res, next) => {
 
sequelize.sync().then(() => {
     models.Store.findAll().then(result => {
        return res.send({type:'success', data:result})
      }).catch((error) => {
       return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      });
    }).catch((error) => {
      return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
    }); 
};

const getOneStore = (req, res, next) => {

  sequelize.sync().then(() => {
    models.Store.findOne({
     where: {
     code: req.params.code
 }
 }).then(result => {

  if(result){
    return res.send({type:'success', data:result, status:200})
  }else{
    return res.send({type:'error', data:[], status:404})
  }
       
     }).catch((error) => {
      return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
     });
   }).catch((error) => {
     return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
   }); 
      
  };





  const UpdateStore = (req, res, next) => {

    
  var data = req.body 
    
  const errors = {};
  let formIsValid = true;
  
  let msg ='Some fields are required';
  
  if(!String(data.code).trim()){
    errors.code =msg;
    formIsValid = false;
  }
  
  
  
  if(!String(data.store_name).trim()){
    errors.store_name =msg;
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
    
        sequelize.sync().then(() => {
            models.Store.update({
  
          image_url: data.image_url,
          store_name:data.store_name,
          telephone: data.telephone,
          email_address: data.email_address,
          address: data.address,
          latitude: data.latitude,
          longitude: data.longitude,
          map_data: data.map_data,
            },{
              where: {
                code: data.code
              }
            }).then(result => {
              return res.send({type:'success', message:'Store successfully updated'})
    
            }).catch((error) => {
             return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
            });
    
          }).catch((error) => {
            return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
          }); 
        }
    };


    

const loginVendor = (req, res, next) => {
  var data = req.body 

  
  sequelize.sync().then(() => {
       models.Store.findOne({
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
            return res.send({type:'success', wallet:result.wallet, code:result.code,  jwt:token, message:'You have successfully login'});

              }  

        }else{
       return res.send({type:'error', message:'it looks like these are not your correct details'})

           }  

        }).catch((error) => {
         return res.send({type:'error',message:'it looks like these are not your correct details', messageDetails:JSON.stringify(error, undefined, 2)})
        });
      }).catch((error) => {
        return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      }); 
  };

module.exports = {
  addNewStore,
  getStores,
  getOneStore,
  UpdateStore,
  getVendorByPhone,
  loginVendor,
  VerifyVendor

};
