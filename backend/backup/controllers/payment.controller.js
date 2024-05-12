const models = require('../models/index');
var multer  = require('multer')
const sequelize = require('../api/connection');
var todayDateTime = new Date().toISOString().slice(0,19)
var today = new Date().toISOString().slice(0,10)

  const AddNewPayment = (req, res, next) => {

var data = req.body 

const errors = {};
let formIsValid = true;

let msg ='Some fields are required';


if(!String(data.code).trim()){
    errors.code =msg;
    formIsValid = false;
} 


if(!Number(data.wallet)){
  errors.wallet =msg;
  formIsValid = false;
}

if(!String(data.user_code).trim()){
  errors.user_code =msg;
  formIsValid = false;
}


if(!Number(data.amount)){
  errors.amount =msg;
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

if(!String(data.reference)){
  errors.reference =msg;
  formIsValid = false;
}

if(!formIsValid){
  return res.send({status:'error', message:'Some fields are required'})
  }else{

    sequelize.sync().then(() => {
     
         models.Payment.create({
          code: data.code,
          wallet:data.wallet,
          order_code: data.order_code,
          status: data.status,
          user_code: data.user_code,
          amount: data.amount,
          discount: data.discount,
         method: data.method,
         payer: data.payer,
         total_item: data.total_item,
         date_paid: todayDateTime,
         reference: data.reference


        }).then(result => {
      return res.send({type:'success', message:'Payment successfully added', status:200})

        }).catch((error) => {
         return res.send({type:'error',message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2), status:500})
        }); 

      }).catch((error) => {
        return res.send({type:'error', message:JSON.stringify(error, undefined, 2), status:500})
      }); 
    }
};

//SELECT sum(CAST(case when TO_CHAR(date_order, 'yyyy-mm-dd')  = '2023-10-12'  then ground_total::varchar else 0::varchar end AS INTEGER)) AS "Thursday" from tbl_orders


const getBalance = (req, res, next) => {

  //Only active products should be display i.e where status = active
  sequelize.query(
    'SELECT ((SELECT  SUM(CAST(p.amount as INTEGER)) FROM tbl_payments p WHERE p.wallet = ?) - (SELECT  coalesce(SUM(CAST(w.amount as INTEGER)),0) FROM tbl_withdrawals w WHERE w.wallet = ?)) as balance',
    {
      replacements: [req.params.wallet, req.params.wallet],
      type: sequelize.QueryTypes.SELECT
    }
).then(result => {
          return res.send({type:'success', data:result})
        }).catch((error) => {
         return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
        });
      
  };
  

  const getTransactions = (req, res, next) => {
 
    sequelize.sync().then(() => {
         models.Payment.findAll({
          where: {
          wallet: req.params.wallet
      },
      attributes: ['payer', 'method', 'amount', 'discount', 'total_item', 'createdAt'],
      order:[
        ['id', 'DESC']
      ],
      limit:15
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
  AddNewPayment,
  getTransactions,
  getBalance
};
