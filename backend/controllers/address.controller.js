const models = require('../models/index');
var multer  = require('multer')
const sequelize = require('../api/connection');

var today = new Date().toISOString().slice(0,10)

  const AddNewAddress = (req, res, next) => {

var data = req.body 
const errors = {};
let formIsValid = true;

let msg ='Some fields are required';



if(!data.user_code){
  errors.user_code =msg;
  formIsValid = false;
}

if(!data.address){
  errors.address =msg;
  formIsValid = false;
}




if(!formIsValid){
  return res.send({status:'error', message:'Some fields are required'})
  }else{

    sequelize.sync().then(() => {
     
         models.Address.create({
          code: data.code,
          user_code:data.user_code,
          type:data.type,
          address: data.address,
          status: 'Active'


        }).then(result => {
      return res.send({type:'success', message:'Address Added', status:200})

        }).catch((error) => {
         return res.send({type:'error', message:'Internal sever error', messageDetails:JSON.stringify(error, undefined, 2), status:500})
        }); 

      }).catch((error) => {
        return res.send({type:'error', message:'Internal sever error', messageDetails:JSON.stringify(error, undefined, 2), status:500})
      }); 
    }
};

  

  const getAddress = (req, res, next) => {
 
    sequelize.sync().then(() => {
         models.Address.findAll({

          where: {
            user_code: req.params.code
        },
         }).then(result => {


            return res.send({type:'success', data:result})
          }).catch((error) => {
           return res.send({type:'error', message:'Unable to retrive data', messageDetails:JSON.stringify(error, undefined, 2)})
          });
        }).catch((error) => {
          return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
        }); 
    };


  



module.exports = {
  AddNewAddress,
  getAddress
};
