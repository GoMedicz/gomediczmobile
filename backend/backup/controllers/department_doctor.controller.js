
const models = require('../models/index');
const sequelize = require('../api/connection');

  const addNewDoctorDepartment = (req, res, next) => {
    var data = req.body 

 sequelize.sync().then(() => {
 
       models.DoctorDepartment.create({
          code: data.code,
          department_code:data.department_code,
          doctor_code: data.doctor_code,
          hospital_code: data.hospital_code,
          status: 'Active',

        }).then(result => {
          return res.send({type:'success', message:'Doctors Department successfully added'})
        }).catch((error) => {
         return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
        });
      }).catch((error) => {
        return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      }); 
}



const getHospitalDoctor= (req, res, next) => {

  let query = "SELECT h.hospital_code, h.doctor_code, h.department_code, d.fullname, d.image_url, d.job_title, d.category, d.fees from tbl_doctors_department h, tbl_doctors d where d.code = h.doctor_code and  h.hospital_code =? ";

   sequelize.query(query,
     {
       replacements: [req.params.code],
       type: sequelize.QueryTypes.SELECT
     }).then(result => {

  if(result){
    return res.send({type:'success', data:result, status:200})
  }else{
    return res.send({type:'error', data:[], status:404})
  }
       
     }).catch((error) => {
      return res.send({type:'error', message:JSON.stringify(error, undefined, 2), status:404})
     });
      
  };

const getDoctorsDepartment = (req, res, next) => {
 
sequelize.sync().then(() => {
     models.DoctorDepartment.findAll().then(result => {
        return res.send({type:'success', data:result})
      }).catch((error) => {
       return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      });
    }).catch((error) => {
      return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
    }); 
}



module.exports = {
  addNewDoctorDepartment,
  getDoctorsDepartment,
  getHospitalDoctor

};
