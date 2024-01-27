
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
          image_url: data.image_url,
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

  
  sequelize.query(
    "SELECT l.lab_name, l.address, l.image_url, l.code, l.latitude, l.longitude, sum(case when t.lab_code = l.code then 1 else 0 end) as total_test from tbl_labs l, tbl_lab_tests t group by l.code order by l.lab_name ASC",
    {
      type: sequelize.QueryTypes.SELECT
    }
).then(result => {
          return res.send({type:'success', data:result})
        }).catch((error) => {
         return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
        });
      
  };


const getOneLab = async(req, res, next) => {
 
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
