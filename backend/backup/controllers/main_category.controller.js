
const models = require('../models/index');
const sequelize = require('../api/connection');

var todayTime = new Date().toISOString().slice(0,19)

const addNewSubCategory = (req, res, next) => {
  var data = req.body 

sequelize.sync().then(() => {
     models.SubCategory.create({

        code: Math.random().toString(36).substring(2, 9),
        title:data.title,
        main_code:data.main_code,

      }).then(result => {
        return res.send({type:'success', message:'Sub Category successfully added'})
      }).catch((error) => {
       return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      });
    }).catch((error) => {
      return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
    }); 
};


  const addNewCategory = (req, res, next) => {
    var data = req.body 

 sequelize.sync().then(() => {

       models.MainCategory.create({

          code: Math.random().toString(36).substring(2, 9),
          title:data.title,
          color: data.color,
          image_url: data.image_url

        }).then(result => {
          return res.send({type:'success', message:'Category successfully added'})
        }).catch((error) => {
         return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
        });
      }).catch((error) => {
        return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      }); 
};





const getSubCategory = (req, res, next) => {
  let query = "SELECT row_number() over (order by s.id) as id, m.title, 'false' as status, m.code as main_code, s.code as sub_code, s.title as sub_title, m.image_url, m.color FROM tbl_categories m LEFT JOIN tbl_sub_categories s on m.code = s.main_code order by m.title ASC ";
  
  sequelize.query(query,
    {
      type: sequelize.QueryTypes.SELECT
    }
).then(result => {
          return res.send({type:'success', data:result})
        }).catch((error) => {
         return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
        });
      
  };

const getCategory = (req, res, next) => {
 
sequelize.sync().then(() => {
     models.MainCategory.findAll().then(result => {
        return res.send({type:'success', data:result})
      }).catch((error) => {
       return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      });
    }).catch((error) => {
      return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
    }); 
};


module.exports = {
  addNewCategory,
  getCategory,
  addNewSubCategory,
  getSubCategory

};
