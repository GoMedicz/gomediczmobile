const models = require('../models/index');
var multer  = require('multer')
const sequelize = require('../api/connection');

var todayDateTime = new Date().toISOString().slice(0,19)
var today = new Date().toISOString().slice(0,10)

  const AddNewOrder = async(req, res, next) => {

var data = req.body 

const errors = {};
let formIsValid = true;

let msg ='Some fields are required';


 if(!String(data.code).trim()){
  errors.code =msg;
  formIsValid = false;
} 


if(!(data.wallet)){
errors.wallet =msg;
formIsValid = false;
}

if(!String(data.user_code).trim()){
errors.user_code =msg;
formIsValid = false;
}




if(!String(data.method).trim()){
errors.method =msg;
formIsValid = false;
} 

if(!String(data.payer).trim()){
errors.payer =msg;
formIsValid = false;
} 

if(!Number(data.total_item)){
errors.total_item =msg;
formIsValid = false;
}




if(!String(data.vendor_code).trim()){
  errors.vendor_code =msg;
  formIsValid = false;
}



if(!Number(data.ground_total)){
  errors.ground_total =msg;
  formIsValid = false;
}


if(!String(data.status)){
  errors.status =msg;
  formIsValid = false;
}

if(!String(data.reference)){
  errors.reference =msg;
  formIsValid = false;
} 

 if(!formIsValid){
  return res.send({status:'error', message:'Some fields are required'})
  }else{
    
    try { 

     




    let list = data.items;

    const items = await  models.Orders.findAll({
      where: {
        code: data.order_code
  }
  })


  if(items.length===0){
    let value = [];
    for (var i = 0; i < list.length; i++) {
      value.push(
        
        {
          code: Math.random().toString(36).substring(2, 9),
          order_code:data.order_code,
          vendor_code:data.vendor_code,
          user_code: data.user_code,
          product_code: list[i].code,
          amount: list[i].amount,
         qty: list[i].qty,
         unit: list[i].qty,
         date_order: today,
         status: data.status,
         reference: data.payment_ref
        })
    } 

    const t = await sequelize.transaction();

    const order = await models.Orders.create({
      code: data.order_code,
      user_code: data.user_code,
      vendor_code: data.vendor_code,
      wallet:data.wallet,
     date_order: todayDateTime,
      status: data.status,
     reference: data.payment_ref,
      ground_total: data.ground_total,
      rider_code: data.rider_code,
     subtotal: data.subtotal,
     service_charge:data.service_charge

    },
    { transaction: t }
    );

    const payment = await models.Payment.create({
      code: data.order_code,
      wallet:data.wallet,
      user_code: data.user_code,
      amount: data.ground_total,
      discount: data.discount,
     method: data.method,
     payer: data.payer,
     total_item: data.total_item,
     date_paid: todayDateTime,
     reference: data.payment_ref
    },
    { transaction: t })


    const Items = await models.OrderItems.bulkCreate(value,
    { transaction: t })

    await t.commit(); 

  }

    return res.send({type:'success', message:'Order successfully placed', status:200})


 }catch (error) {
  return res.send({type:'error', message:JSON.stringify(error, undefined, 2), status:500})
}
  } 
  }






const getTransactions = async(req, res, next) => {

  const items = await  models.OrderItems.findAll({
    where: {
      vendor_code: req.params.code
}
})


  sequelize.query(
    "SELECT  o.id, o.code, u.fullname, u.image_url, o.date_order, o.status, o.ground_total, p.method, o.reference  from tbl_users u, tbl_orders o, tbl_payments p where p.code = o.code and u.code = o.user_code and o.vendor_code =? order by o.id DESC ",
    {
      replacements: [req.params.code],
      type: sequelize.QueryTypes.SELECT
    }
).then(result => {
  if(result.length!==0 && Array.isArray(result)){
    return res.send({type:'success', data:result, items:items})
  }else{
    return res.send({type:'error', message:'There are no data to display'})
  }
        }).catch((error) => {
         return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
        });
      
  };
  


  const getOrder = async(req, res, next) => {
    const items = await  models.OrderItems.findAll({
      where: {
      order_code: req.params.code,
      vendor_code:req.params.vendor
  }
  })
    sequelize.query(
      "SELECT  o.id, o.code, o.image_url as prescription, u.fullname, u.image_url, o.date_order, o.status, o.subtotal, p.discount, o.service_charge, o.ground_total, p.method, o.reference  from tbl_users u, tbl_orders o, tbl_payments p where p.code = o.code and u.code = o.user_code and o.vendor_code =? and o.code =? ",
      {
        replacements: [req.params.vendor, req.params.code],
        type: sequelize.QueryTypes.SELECT
      }
  ).then(result => {
    if(result.length!==0 && Array.isArray(result)){
      return res.send({type:'success', data:result, items :items })
    }else{
      return res.send({type:'error', message:'There are no data to display'})
    }
          }).catch((error) => {
           return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
          });
        
    };

    
    


    const getStatistics = async(req, res, next) => {
      
      var data = req.body 

      const items = await  sequelize.query(
        "SELECT count(p.code) as total, p.product_name, p.image_url, sum(CAST(o.amount as INTEGER)) as revenue, c.category_name from tbl_order_items o, tbl_pharmacy_products p  LEFT JOIN tbl_pharmacy_products_categories c on c.code =p.category_code where o.product_code = p.code and o.vendor_code =? GROUP BY o.product_code, p.product_name, p.image_url, c.category_name order by total ASC LIMIT 20",
        {
          replacements: [data.code],
          type: sequelize.QueryTypes.SELECT
        }
    )


      sequelize.query(
        "SELECT  (SELECT count(o.id)  from tbl_orders o where o.wallet =?) as order, (SELECT  SUM(CAST(p.amount as INTEGER)) FROM tbl_payments p WHERE p.wallet = ?) as revenue, (SELECT count(o.id)  from tbl_orders o where o.status ='PENDING' and o.wallet =?) as pending ",
        {
          replacements: [data.wallet, data.wallet, data.wallet],
          type: sequelize.QueryTypes.SELECT
        }
    ).then(result => {
      if(result.length!==0 && Array.isArray(result)){
        return res.send({type:'success', data:result, items :items })
      }else{
        return res.send({type:'error', message:'There are no data to display'})
      }
            }).catch((error) => {
             return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
            });
          
      };


    const UploadFile = (req, res, next) => {

      var data = req.body 
      
      const errors = {};
      let formIsValid = true;
      
      let msg ='Some fields are required';
      
      
      if(!String(data.code).trim()){
          errors.code =msg;
          formIsValid = false;
      } 
      
      
      
      if(!String(data.image_url)){
        errors.image_url=msg;
        formIsValid = false;
      }
      
      if(!formIsValid){
        return res.send({status:'error', message:'Some fields are required'})
        }else{
      
          sequelize.sync().then(() => {
           
               models.Orders.update({
                image_url:data.code+'.png'
              },{
                where: {
                  code: data.code,
                }
              }).then(result => {
            return res.send({type:'success', message:'File uploaded', status:200})
      
              }).catch((error) => {
               return res.send({type:'error',message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2), status:500})
              }); 
      
            }).catch((error) => {
              return res.send({type:'error', message:JSON.stringify(error, undefined, 2), status:500})
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
             
                 models.Orders.update({
                  [data.field]:data.data
                },{
                  where: {
                    code: data.code,
                  }
                }).then(result => {
              return res.send({type:'success', message:'Order updated', status:200})
        
                }).catch((error) => {
                 return res.send({type:'error',message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2), status:500})
                }); 
        
              }).catch((error) => {
                return res.send({type:'error', message:JSON.stringify(error, undefined, 2), status:500})
              }); 
            }
        };
  

  



      const getUserOrder = async(req, res, next) => {
      
   
        sequelize.query(
          "SELECT i.id, i.code, i.qty, i.amount, i.status, p.product_name, p.require_prescription, s.store_name. s.image_url, s.code as store_code, o.ground_total, o.date_order, o.status, o.createdAt from tbl_order_items i, tbl_pharmacy_products p, tbl_pharmacy_stores s, tbl_orders o WHERE p.code = i.product_code and s.code = i.vendor_code and o.code =i.order_code  and o.user_code =?  ",
          {
            replacements: [req.params.code],
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



module.exports = {
  AddNewOrder,
  getTransactions,
  getOrder,
  UploadFile,
  UpdateField,
  getStatistics,
  getUserOrder
};
