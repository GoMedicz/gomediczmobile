const models = require('../models/index');
var multer  = require('multer')
const sequelize = require('../api/connection');

var today = new Date().toISOString().slice(0,10)

  const AddNewWithdrawal = (req, res, next) => {

var data = req.body 
const errors = {};
let formIsValid = true;

let msg ='Some fields are required';


if(!String(data.code).trim()){
    errors.code =msg;
    formIsValid = false;
} 


if(!data.wallet){
  errors.wallet =msg;
  formIsValid = false;
}

if(!String(data.bank_name).trim()){
  errors.bank_name =msg;
  formIsValid = false;
}


if(!Number(data.amount)){
  errors.amount =msg;
  formIsValid = false;
}


if(!data.account_number){
  errors.account_number =msg;
  formIsValid = false;
} 


if(!String(data.account_name).trim()){
  errors.account_name =msg;
  formIsValid = false;
} 




if(!formIsValid){
  return res.send({status:'error', message:'Some fields are required'})
  }else{

    sequelize.sync().then(() => {
     
         models.Withdrawal.create({
          code: data.code,
          wallet:data.wallet,
          bank_code: data.bank_code,
          bank_name: data.bank_name,
          amount: data.amount,
          account_number: data.account_number,
          account_name: data.account_name,
          date_request: today,
         branch_code: data.branch_code,
         status: 'Pending',
         transaction_mode: 'Deposit',
         transaction_ref: data.code+data.wallet


        }).then(result => {
      return res.send({type:'success', message:'Transaction Added', status:200})

        }).catch((error) => {
         return res.send({type:'error', message:'Internal sever error', messageDetails:JSON.stringify(error, undefined, 2), status:500})
        }); 

      }).catch((error) => {
        return res.send({type:'error', message:'Internal sever error', messageDetails:JSON.stringify(error, undefined, 2), status:500})
      }); 
    }
};

  

  const getTransactions = (req, res, next) => {
 
    sequelize.sync().then(() => {
         models.Withdrawal.findAll({
          where: {
          wallet: req.params.wallet
      }
      }).then(result => {
            return res.send({type:'success', data:result})
          }).catch((error) => {
           return res.send({type:'error', message:'Unable to retrive data', messageDetails:JSON.stringify(error, undefined, 2)})
          });
        }).catch((error) => {
          return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
        }); 
    };

   


  const getEarnings = async(req, res, next) => {
 
    var data = req.body 
    const earning = await  sequelize.query(
      "SELECT sum(CAST(amount as INTEGER)) as earning from tbl_payments where wallet =?",
      {
        replacements: [data.wallet],
        type: sequelize.QueryTypes.SELECT
      }
  )


//get week list here
sequelize.query(data.sql,
  {
    type: sequelize.QueryTypes.SELECT
  }
).then(result => {
        return res.send({type:'success', data:result, earning:earning})
      }).catch((error) => {
          return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
        }); 
    };


module.exports = {
  AddNewWithdrawal,
  getTransactions,
  getEarnings
};
