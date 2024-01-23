
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



module.exports = {
  addNewAppointment,
  getAppointment

};
