const models = require('../models/index');
const sequelize = require('../api/connection');


  const AddNewProduct = (req, res, next) => {

var data = req.body 

const errors = {};
let formIsValid = true;

let msg ='Some fields are required';

if(!String(data.code).trim()){
  errors.code =msg;
  formIsValid = false;
}

if(!String(data.pharmacy_code).trim()){
    errors.pharmacy_code =msg;
    formIsValid = false;
} 


if(!String(data.staff_code).trim()){
  errors.staff_code =msg;
  formIsValid = false;
}

if(!String(data.category_code).trim()){
  errors.product_id =msg;
  formIsValid = false;
}


if(!String(data.product_name).trim()){
  errors.product_name =msg;
  formIsValid = false;
}

if(!String(data.product_id).trim()){
  errors.product_id =msg;
  formIsValid = false;
}


if(!formIsValid){
  return res.send({type:'error', message:'Some fields are required'})
  }else{



    sequelize.sync().then(() => {
        models.Products.create({

          code: data.code,
          pharmacy_code:data.pharmacy_code,
          staff_code: data.staff_code,
          image_url: data.image_url,
          product_id: data.product_id,
          product_name:data.product_name,

          category_code: data.category_code,
          subcategory_code: data.subcategory_code,
          description: data.description,
          require_prescription: data.require_prescription,
          price_list: data.price_list,


        }).then(result => {
          return res.send({type:'success', message:'Product successfully added'})

        }).catch((error) => {
         return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
        });

      }).catch((error) => {
        return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      }); 
    }
};

module.exports = {
    AddNewProduct
};
