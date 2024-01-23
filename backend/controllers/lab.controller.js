
const models = require('../models/index');
const sequelize = require('../api/connection');

var todayTime = new Date().toISOString().slice(0,19)
var today = new Date().toISOString().slice(0,10)

  const addNewLab = (req, res, next) => {
    var data = req.body 

 sequelize.sync().then(() => {
 
       models.Lab.create({

          code: data.code,
          lab_name:data.lab_name,
          address: data.address,
          image_url: '',
          latitude: data.latitude,
          longitude: data.longitude,
          status: 'Active',
          telephone: data.telephone,
          email: data.email,
          about: data.about,
          facility: '[]'


        }).then(result => {
          return res.send({type:'success', message:'Lab successfully added'})
        }).catch((error) => {
         return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
        });
      }).catch((error) => {
        return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      }); 
};




const getLab = (req, res, next) => {
 
sequelize.sync().then(() => {
     models.Lab.findAll({
      order: sequelize.literal('lab_name ASC')
  }).then(result => {
        return res.send({type:'success', data:result})
      }).catch((error) => {
       return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      });
    }).catch((error) => {
      return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
    }); 
};


const getOneLab = async(req, res, next) => {
  /* let query = "SELECT h.hospital_code, h.doctor_code, h.department_code, d.fullname, d.image_url, d.job_title, d.category, d.fees, d.office, d.date_started from tbl_doctors_departments h, tbl_doctors d where d.code = h.doctor_code and  h.hospital_code =? ";

  const doctors = await  sequelize.query(query,
    {
      replacements: [req.params.code],
      type: sequelize.QueryTypes.SELECT
    }
) */


  sequelize.sync().then(() => {
       models.Lab.findOne({
          where: {
          code: req.params.code
      }
      
    }).then(result => {
          return res.send({type:'success', data:result})
        }).catch((error) => {
         return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
        });
      }).catch((error) => {
        return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      }); 
  }


module.exports = {
  addNewLab,
  getLab,
  getOneLab

};
