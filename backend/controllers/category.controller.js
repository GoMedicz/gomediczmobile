
const models = require('../models/index');
const sequelize = require('../api/connection');

var todayTime = new Date().toISOString().slice(0,19)

  const addNewCategory = (req, res, next) => {
    var data = req.body 

 sequelize.sync().then(() => {

       models.Category.create({

          code: data.code,
          pharmacy_code:data.pharmacy_code,
          parent_code: data.parent_code,
          staff_code: data.staff_code,
          image_url: data.image_url,
          category_name: data.category_name

        }).then(result => {
          return res.send({type:'success', message:'Category successfully added'})
        }).catch((error) => {
         return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
        });
      }).catch((error) => {
        return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      }); 
};




const getCategory = (req, res, next) => {
 
sequelize.sync().then(() => {
     models.Category.findAll({
      where: {
      pharmacy_code: req.params.pharmacy_code
  }
  }).then(result => {
        return res.send({type:'success', data:result})
      }).catch((error) => {
       return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      });
    }).catch((error) => {
      return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
    }); 
};

const greetings = (req, res, next) => {
  
       return res.send({type:'success', message:'Welcome to backend'})
}

module.exports = {
  addNewCategory,
  getCategory,
  greetings

};
