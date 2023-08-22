const models = require('../models/index');
const sequelize = require('../api/connection');


  const AddNewProduct = (req, res, next) => {

var data = req.body 

    sequelize.sync().then(() => {
        models.Products.create({
          title: "Clean Code",
          author: "Robert Cecil Martin",
          release_date: "2021-12-14",
          subject: 3
        }).then(res => {
          return res.send({type:'success', message:'Product successfully added'})
        }).catch((error) => {
         return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
        });
      }).catch((error) => {
        return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      }); 
};

module.exports = {
    
    AddNewProduct

};
