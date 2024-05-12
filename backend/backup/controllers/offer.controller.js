const models = require('../models/index');
var multer  = require('multer')
const sequelize = require('../api/connection');

var today = new Date().toISOString().slice(0,10)

  const AddNewOffer = (req, res, next) => {

var data = req.body 
const errors = {};
let formIsValid = true;

let msg ='Some fields are required';



if(!data.promo_code){
  errors.promo_code =msg;
  formIsValid = false;
}

if(!data.percentage){
  errors.percentage =msg;
  formIsValid = false;
}




if(!formIsValid){
  return res.send({status:'error', message:'Some fields are required'})
  }else{

    sequelize.sync().then(() => {
     
         models.Offer.create({
          code: data.code,
          promo_code:data.promo_code,
          percentage:data.percentage,
          expiry: data.expiry,
          title: data.title,
          status: data.status,
          usage_history: '[]'


        }).then(result => {
      return res.send({type:'success', message:'Offer Added', status:200})

        }).catch((error) => {
         return res.send({type:'error', message:'Internal sever error', messageDetails:JSON.stringify(error, undefined, 2), status:500})
        }); 

      }).catch((error) => {
        return res.send({type:'error', message:'Internal sever error', messageDetails:JSON.stringify(error, undefined, 2), status:500})
      }); 
    }
};

  

  const getOffer = (req, res, next) => {
 
    sequelize.sync().then(() => {
         models.Offer.findAll().then(result => {
            return res.send({type:'success', data:result})
          }).catch((error) => {
           return res.send({type:'error', message:'Unable to retrive data', messageDetails:JSON.stringify(error, undefined, 2)})
          });
        }).catch((error) => {
          return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
        }); 
    };


    const ConfirmPromo = async(req, res, next) => {
   
      sequelize.query(
        "SELECT code, percentage, id, promo_code,  expiry, title from tbl_offers where status ='Active' and expiry >=date_format(now(), '%Y-%m-%d') and promo_code = ? ",
        {
          replacements: [req.params.code],
          type: sequelize.QueryTypes.SELECT
        }
    ).then(result => {
      if(result.length!==0 && Array.isArray(result)){
        return res.send({type:'success', data:result[0]})
      }else{
        return res.send({type:'error', message:'There are no data to display'})
      }
            }).catch((error) => {
             return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
            });
          
      }


  const getActiveOffer = async(req, res, next) => {
   
    sequelize.query(
      "SELECT code, percentage, id, usage_history, promo_code, title, expiry from tbl_offers where status ='Active' and expiry >=date_format(now(), '%Y-%m-%d')  ",
      {
        type: sequelize.QueryTypes.SELECT
      }
  ).then(result => {
    if(result.length!==0 && Array.isArray(result)){
      return res.send({type:'success', data:result })
    }else{
      return res.send({type:'error', message:'There are no data to display'})
    }
          }).catch((error) => {
           return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
          });
        
    }



module.exports = {
  AddNewOffer,
  getOffer,
  getActiveOffer,
  ConfirmPromo
};
