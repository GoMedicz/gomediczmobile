
const models = require('../models/index');
const sequelize = require('../api/connection');

var todayTime = new Date().toISOString().slice(0,19)
var today = new Date().toISOString().slice(0,10)
 



const AddNewReminder = async(req, res, next) => {

  var data = req.body 
  
  
  const errors = {};
  let formIsValid = true;
  
  let msg ='Some fields are required';
  
  
  if(!data.pillName){
  errors.pillName =msg;
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
  
  
      let list = data.items;
   let unique = Math.random().toString(36).substring(2, 9)

      let value = [];
      for (var i = 0; i < list.length; i++) {
        value.push(
          
          {
            code: Math.random().toString(36).substring(2, 9),
            user_code:data.user_code,
            unique_code:unique,
            day: list[i].day,
            time: list[i].time,
            days: data.days,
            times: data.times,
           pill_name: data.pillName
          })
      } 
  
      const t = await sequelize.transaction();
  
      const Items = await models.Reminder.bulkCreate(value,
      { transaction: t })
  
      await t.commit(); 
  
      return res.send({type:'success', data:list, message:'Reminder successfully Added', status:200})
  
  
  }catch (error) {
    return res.send({type:'error', message:JSON.stringify(error, undefined, 2), status:500})
  }
}
    }
    

    



    const getUserReminder = async(req, res, next) => {
      
    
      sequelize.query(
        "SELECT id, code, pill_name, day, time, days, times from tbl_reminders where user_code =? group by unique_code ",
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
  AddNewReminder,
  getUserReminder
};
