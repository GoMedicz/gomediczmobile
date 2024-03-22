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



if(!Number(data.amount)){
  errors.amount =msg;
  formIsValid = false;
}



if(!formIsValid){
  return res.send({status:'error', message:'Some fields are required'})
  }else{

    sequelize.sync().then(() => {
     
         models.Credit.create({
          code: data.code,
          wallet:data.wallet,
          user_code: data.user_code,
          amount: data.amount,
         method: data.method,
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
    "SELECT  (SELECT  coalesce(SUM(CAST(w.amount as INTEGER)),0) FROM tbl_credits w WHERE w.wallet = ?)- IFNULL((SELECT  SUM(CAST(p.amount as INTEGER)) FROM tbl_payments p WHERE p.method ='Wallet' and  p.wallet = ?),0) as balance",
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
         models.Credit.findAll({
          where: {
          wallet: req.params.wallet
      },
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
  getBalance,
  getTransactions
};
