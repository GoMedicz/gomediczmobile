
const models = require('../models/index');
const sequelize = require('../api/connection');

var todayTime = new Date().toISOString().slice(0,19)
var today = new Date().toISOString().slice(0,10)

var todayDateTime = new Date().toISOString().slice(0,19)
  const addNewLabTest = (req, res, next) => {
    var data = req.body 

 sequelize.sync().then(() => {
 
       models.LabTest.create({

          code: data.code,
          lab_code:data.lab_code,
          title: data.title,
          fees: data.fees


        }).then(result => {
          return res.send({type:'success', message:'Lab Test successfully added'})
        }).catch((error) => {
         return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
        });
      }).catch((error) => {
        return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      }); 
};





const getLabTest = (req, res, next) => {

  
  sequelize.query(
    'SELECT title, lab_code, fees, code FROM tbl_lab_tests group by title order by title ASC ',
    {
      type: sequelize.QueryTypes.SELECT
    }
).then(result => {
          return res.send({type:'success', data:result})
        }).catch((error) => {
         return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
        });
      
  };



const getOneLabTest = (req, res, next) => {
  let query = "SELECT 'false' as status, t.title, t.code, t.fees, t.lab_code, l.lab_name, l.code as lab_code from tbl_lab_tests t, tbl_labs l where l.code = t.lab_code and t.lab_code =? ";
  
  sequelize.query(query,
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



  const AddNewBooking = async(req, res, next) => {

    var data = req.body
    
    const errors = {};
    let formIsValid = true;
    
    let msg ='Some fields are required';
    
    
    
    
    if(!data.order_code){
    errors.order_code =msg;
    formIsValid = false;
    }
    
    if(!data.user_code){
    errors.user_code =msg;
    formIsValid = false;
    }


    
    if(!formIsValid){
      return res.send({status:'error', message:'Some fields are required'})
      }else{
        try {
    
    let code = Math.random().toString(36).substring(2, 9)
    let list = data.items;
    
    
        let value = [];
     for (var i = 0; i < list.length; i++) {
          value.push(
            
            {
              code: Math.random().toString(36).substring(2, 9),
              order_code:data.order_code,
              user_code: data.user_code,
              lab_code:list[i].lab_code,
              test_code:list[i].code,
              status:data.status,
              date_order:today,
                fees: list[i].fees
            })
        } 
    
        const t = await sequelize.transaction();
    
        const summary = await models.TestBookingSummary.create({
          code: code,
          user_code: data.user_code,
          order_code: data.order_code,
          subtotal: data.subtotal,
         charge: data.charge,
        total: data.total,
        date_book: data.date_book,
        time_book: data.time_book,
        status: data.status,
        address:data.address
        },
        { transaction: t })
    
    
        const payment = await models.Payment.create({
          code: data.order_code,
          wallet:data.wallet,
          user_code: data.user_code,
          amount: data.total,

          order_code: data.order_code,
          status: data.status,
          discount: 0,
         method: data.method,
         payer: data.payer,
         total_item: data.total_item,
         date_paid: todayDateTime,
         reference: data.payment_ref
        },
        { transaction: t }) 

        const Items = await models.TestBooking.bulkCreate(value,
        { transaction: t })
    
        await t.commit(); 
    
        return res.send({type:'success', message:'Order successfully placed', status:200}) 
    
    
    }catch (error) {
      return res.send({type:'error', message:JSON.stringify(error, undefined, 2), status:500})
    }
      }

      }



      const getUserLabTest = async(req, res, next) => {
      
        let query = "SELECT rand() as item_key, t.id, tb.code, t.title, l.image_url,  l.lab_name, l.email, l.telephone, tb.fees, tb.order_code, tb.status, b.address, b.date_book, b.time_book  from tbl_labs l, tbl_lab_tests t, tbl_test_bookings tb, tbl_test_booking_summaries b   WHERE b.order_code = tb.order_code and l.code = t.lab_code and tb.lab_code = l.code and tb.test_code = t.code and DATE(b.date_book) >= DATE(NOW()) and  b.user_code =? ";
      
        const upcoming = await  sequelize.query(query,
          {
            replacements: [req.params.code],
            type: sequelize.QueryTypes.SELECT
          }
      )
      
      
      
        sequelize.query(
          "SELECT  rand() as item_key, t.id, t.title, tb.code, l.image_url,  l.lab_name, l.email, l.telephone, tb.fees, tb.order_code, tb.status, b.address, b.date_book, b.time_book  from tbl_labs l, tbl_lab_tests t, tbl_test_bookings tb, tbl_test_booking_summaries b   WHERE b.order_code = tb.order_code and l.code = t.lab_code and tb.lab_code = l.code and tb.test_code = t.code and DATE(b.date_book) < DATE(NOW()) and  b.user_code =?  ",
          {
            replacements: [req.params.code],
            type: sequelize.QueryTypes.SELECT
          }
      ).then(result => {
        if(result.length!==0 || Array.isArray(upcoming)){
          return res.send({type:'success', past:result, upcoming :upcoming })
        }else{
          return res.send({type:'error', data:'[]', message:'There are no data to display'})
        }
              }).catch((error) => {
               return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
              });
            
        };


module.exports = {
  addNewLabTest,
  getLabTest,
  getOneLabTest,
  AddNewBooking,
  getUserLabTest
};
