const models = require('../models/index');
var multer  = require('multer')
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
          price:data.price,
          qty:data.qty,
          status: 'Pending',

        }).then(result => {
          return res.send({type:'success', message:'Product successfully added'})

        }).catch((error) => {
         return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
        });  

      }).catch((error) => {
        return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      }); 
    }
};


const searchProductByName = (req, res, next) => {

  //Only active products should be display i.e where status = active
  sequelize.query(
    "SELECT p.id, p.code, p.product_name, p.product_id, p.image_url, p.require_prescription, p.price, p.qty, s.title as category FROM tbl_pharmacy_products p LEFT JOIN tbl_sub_categories s on s.code = p.subcategory_code  where  p.product_name LIKE  '%?%' order by p.id DESC",
    {
      replacements: [req.params.title],
      type: sequelize.QueryTypes.SELECT
    }
).then(result => {
  if(result.length!==0 && Array.isArray(result)){
    return res.send({type:'success', data:result })
  }else{
    return res.send({type:'error', data:'[]', message:'There are no data to display'})
  }
        }).catch((error) => {
         return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
        });
      
  };

const getProductByCategory = (req, res, next) => {

  //Only active products should be display i.e where status = active
  sequelize.query(
    'SELECT p.id, p.code, p.product_name, p.product_id, p.image_url, p.require_prescription, p.price, p.qty, s.title as category FROM tbl_pharmacy_products p LEFT JOIN tbl_sub_categories s on s.code = p.subcategory_code  where  (p.category_code = ? or p.subcategory_code = ?) order by p.id DESC',
    {
      replacements: [req.params.code, req.params.code],
      type: sequelize.QueryTypes.SELECT
    }
).then(result => {
  if(result.length!==0 && Array.isArray(result)){
    return res.send({type:'success', data:result })
  }else{
    return res.send({type:'error', data:'[]', message:'There are no data to display'})
  }
        }).catch((error) => {
         return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
        });
      
  };




const searchOneProduct = (req, res, next) => {

  //Only active products should be display i.e where status = active
  sequelize.query(
    'SELECT p.code, p.product_name, p.product_id, p.image_url, p.require_prescription, p.price, p.qty, c.title as category, p.description, s.code as store_code, s.store_name, s.image_url as store_image, s.address FROM tbl_pharmacy_stores s, tbl_pharmacy_products p  LEFT JOIN tbl_sub_categories c on c.code = p.subcategory_code WHERE  s.code = p.pharmacy_code and p.code =? order by p.id DESC',
    {
      replacements: [req.params.code],
      type: sequelize.QueryTypes.SELECT
    }
).then(result => {
          return res.send({type:'success', data:result})
        }).catch((error) => {
         return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
        });
      
  };


const getProducts = (req, res, next) => {

  //Only active products should be display i.e where status = active
  sequelize.query(

    'SELECT p.id, p.code, p.product_name, p.product_id, p.image_url, p.require_prescription, p.price, p.qty, c.title as category, p.description FROM tbl_pharmacy_products p  LEFT JOIN tbl_sub_categories c on c.code = p.subcategory_code WHERE   p.pharmacy_code =? order by p.id DESC',
    {
      replacements: [req.params.code],
      type: sequelize.QueryTypes.SELECT
    }
).then(result => {
          return res.send({type:'success', data:result})
        }).catch((error) => {
         return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
        });
      
  };
  



  const getAllProducts = async(req, res, next) => {

  

    sequelize.query(
      'SELECT s.store_name, p.id, p.code, p.product_name, p.product_id, p.image_url, p.require_prescription, p.price, p.qty, c.title as category, p.description FROM tbl_pharmacy_stores s,  tbl_pharmacy_products p  LEFT JOIN tbl_sub_categories c on c.code = p.subcategory_code where s.code = p.pharmacy_code  order by p.id DESC',
      {
        type: sequelize.QueryTypes.SELECT
      }
      ).then(result => {
    if(result.length!==0 && Array.isArray(result)){
      return res.send({type:'success', data:result })
    }else{
      return res.send({type:'error', data:'[]', message:'There are no data to display'})
    }
          }).catch((error) => {
           return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
          });
        
    };

  const getOneProduct = (req, res, next) => {

    sequelize.sync().then(() => {
      models.Products.findOne({
       where: {
       pharmacy_code: req.params.pharmacy_code,
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


    const UpdateProduct = (req, res, next) => {

      var data = req.body 
      
      const errors = {};
      let formIsValid = true;
      
      let msg ='Some fields are required';
      
      if(!String(data.code).trim()){
        errors.code =msg;
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
              models.Products.update({
    
                image_url: data.image_url,
                product_id: data.product_id,
                product_name:data.product_name,
      
                category_code: data.category_code,
                subcategory_code: data.subcategory_code,
                description: data.description,
                require_prescription: data.require_prescription,
                price: data.price,
                qty: data.qty,
              },{
                where: {
                  code: data.code,
                }
              }).then(result => {
                return res.send({type:'success', message:'Product successfully updated'})
      
              }).catch((error) => {
               return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
              });
      
            }).catch((error) => {
              return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
            }); 
          }
      };

module.exports = {
    AddNewProduct,
    getProducts,
    getOneProduct,
    UpdateProduct,
    getProductByCategory,
    searchOneProduct,
    getAllProducts,
    searchProductByName
};
