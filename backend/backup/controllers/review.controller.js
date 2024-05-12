
const models = require('../models/index');
const sequelize = require('../api/connection');

var todayTime = new Date().toISOString().slice(0,19)
var today = new Date().toISOString().slice(0,10)
  const addNewReview = (req, res, next) => {
    var data = req.body 

 sequelize.sync().then(() => {
 
       models.Review.create({

          code: data.code,
          review_type:data.review_type,
          review_user_code: data.review_user_code,
          user_code: data.user_code,
          message: data.message,
          rating: data.rating,
          reviewed_for: data.reviewed_for,
          date_review: today,
          status: data.status,

        }).then(result => {
          return res.send({type:'success', message:'Review successfully added'})
        }).catch((error) => {
         return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
        });
      }).catch((error) => {
        return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      }); 
};




const getReview = (req, res, next) => {
 
sequelize.sync().then(() => {
     models.Review.findAll().then(result => {
        return res.send({type:'success', data:result})
      }).catch((error) => {
       return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      });
    }).catch((error) => {
      return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
    }); 
};



module.exports = {
  addNewReview,
  getReview

};
