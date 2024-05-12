
const models = require('../models/index');
const sequelize = require('../api/connection');


var todayTime = new Date().toISOString().slice(0,19)

  const addNewSpeciality = (req, res, next) => {
    var data = req.body 

 sequelize.sync().then(() => {

       models.Speciality.create({

          code: data.code,
          title:data.title,
          color_code: data.color_code,
          icon:data.icon

        }).then(result => {
          return res.send({type:'success', message:'Speciality successfully added'})
        }).catch((error) => {
         return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
        });
      }).catch((error) => {
        return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      }); 
};




const getSpeciality = (req, res, next) => {
 
sequelize.sync().then(() => {
     models.Speciality.findAll().then(result => {
        return res.send({type:'success', data:result})
      }).catch((error) => {
       return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      });
    }).catch((error) => {
      return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
    }); 
};



module.exports = {
  addNewSpeciality,
  getSpeciality,

};
