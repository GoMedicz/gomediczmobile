
const models = require('../models/index');
const sequelize = require('../api/connection');

var todayTime = new Date().toISOString().slice(0,19)
var today = new Date().toISOString().slice(0,10)
  const addNewAppointment = (req, res, next) => {
    var data = req.body 

 sequelize.sync().then(() => {
 
       models.Appointment.create({

          code: data.code,
          user_code:data.user_code,
          doctor_code: data.doctor_code,
          appointment_date: data.date,
          appointment_time: data.time,
          title: data.title,
          attachment: data.image_url,
          remark: '',
          status: 'Pending',

        }).then(result => {
          return res.send({type:'success', message:'Appointment successfully added'})
        }).catch((error) => {
         return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
        });
      }).catch((error) => {
        return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      }); 
};




const getAppointment = (req, res, next) => {
 
sequelize.sync().then(() => {
     models.Appointment.findAll().then(result => {
        return res.send({type:'success', data:result})
      }).catch((error) => {
       return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      });
    }).catch((error) => {
      return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
    }); 
};




const getUserAppointment = async(req, res, next) => {
      
  let query = "SELECT  a.id, d.code as doctor_code, a.code, d.fullname,  ifnull(d.image_url, '') as image_url, d.telephone, ifnull(d.job_title, '') as job_title, ifnull(d.category, '') as category, ifnull(d.fees, 0) as fees, ifnull(d.office, '') as office, a.appointment_date, a.appointment_time, a.title, a.attachment, a.status, a.remark, 'false' as active  from tbl_doctors d, tbl_appointments a where d.code = a.doctor_code  and DATE(a.appointment_date) >= DATE(NOW()) and  a.user_code =? ";

  const upcoming = await  sequelize.query(query,
    {
      replacements: [req.params.code],
      type: sequelize.QueryTypes.SELECT
    }
)



  sequelize.query(
    "SELECT a.id, d.code as doctor_code, a.code, d.fullname,  ifnull(d.image_url, '') as image_url, d.telephone, ifnull(d.job_title, '') as job_title, ifnull(d.category, '') as category, ifnull(d.fees, 0) as fees, ifnull(d.office, '') as office, a.appointment_date, a.appointment_time, a.title, a.attachment, a.status, a.remark, 'false' as active  from tbl_doctors d, tbl_appointments a where d.code = a.doctor_code and DATE(a.appointment_date) < DATE(NOW()) and  a.user_code =?  ",
    {
      replacements: [req.params.code],
      type: sequelize.QueryTypes.SELECT
    }
).then(result => {
  if(result.length!==0 && Array.isArray(result)){
    return res.send({type:'success', past:result, upcoming :upcoming })
  }else{
    return res.send({type:'error', data:'[]', message:'There are no data to display'})
  }
        }).catch((error) => {
         return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
        });
      
  };





const getOneUserAppointment = async(req, res, next) => {
      
  sequelize.query(
    "SELECT a.id, d.code as doctor_code, a.code, d.fullname,  ifnull(d.image_url, '') as image_url, d.telephone, ifnull(d.job_title, '') as job_title, ifnull(d.category, '') as category, ifnull(d.fees, 0) as fees, ifnull(d.office, '') as office,  a.appointment_date, a.appointment_time, a.title, a.attachment, a.status, a.remark, 'false' as active  from tbl_doctors d, tbl_appointments a where d.code = a.doctor_code and  a.code =?  ",
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
  addNewAppointment,
  getAppointment,
  getUserAppointment,
  getOneUserAppointment

};
