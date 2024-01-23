
const models = require('../models/index');
const sequelize = require('../api/connection');

var todayTime = new Date().toISOString().slice(0,19)
var today = new Date().toISOString().slice(0,10)
  const addNewHospital = (req, res, next) => {
    var data = req.body 

 sequelize.sync().then(() => {
 
       models.Hospital.create({

          code: data.code,
          hospital_name:data.hospital_name,
          address: data.address,
          map: data.map,
          latitude: data.latitude,
          longitude: data.longitude,
          category: data.category,
          status: 'Pending',
          telephone: data.telephone,
          email: data.email,
          facility: '[]',
          department: '[]',
          about: data.about,
          image_list: '[]',


        }).then(result => {
          return res.send({type:'success', message:'Hospital successfully added'})
        }).catch((error) => {
         return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
        });
      }).catch((error) => {
        return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      }); 
};




const getHospital = (req, res, next) => {
 
sequelize.sync().then(() => {
     models.Hospital.findAll({
      order: sequelize.literal('hospital_name ASC')
  }).then(result => {
        return res.send({type:'success', data:result})
      }).catch((error) => {
       return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      });
    }).catch((error) => {
      return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
    }); 
};


const getOneHospital = async(req, res, next) => {
  let query = "SELECT h.hospital_code, h.doctor_code, h.department_code, d.fullname, d.image_url, d.job_title, d.category, d.fees, d.office, d.date_started from tbl_doctors_departments h, tbl_doctors d where d.code = h.doctor_code and  h.hospital_code =? ";

  const doctors = await  sequelize.query(query,
    {
      replacements: [req.params.code],
      type: sequelize.QueryTypes.SELECT
    }
)


  sequelize.sync().then(() => {
       models.Hospital.findOne({
          where: {
          code: req.params.code
      }
      
    }).then(result => {
          return res.send({type:'success', data:result, doctors:doctors})
        }).catch((error) => {
         return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
        });
      }).catch((error) => {
        return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      }); 
  }


module.exports = {
  addNewHospital,
  getHospital,
  getOneHospital

};
