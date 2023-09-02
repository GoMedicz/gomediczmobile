
const models = require('../models/index');
const sequelize = require('../api/connection');


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
  
 sequelize.sync().then(() => {
       models.Store.create({
          code: data.code,
          image_url: data.image_url,
          store_name:data.store_name,
          telephone: data.telephone,
          email_address: data.email_address,
          address: data.address,
          latitude: data.latitude,
          longitude: data.longitude,
          map_data: data.map_data,

        }).then(result => {
          return res.send({type:'success', message:'Store successfully added'})
        }).catch((error) => {
         return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
        });
      
      }).catch((error) => {
        return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      }); 
    }
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

module.exports = {
  addNewStore,
  getStores,
  getOneStore,
  UpdateStore

};
