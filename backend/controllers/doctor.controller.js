const models = require('../models/index');
var multer  = require('multer')
const sequelize = require('../api/connection');
const bcrypt = require('bcrypt');


  const AddNewDoctor = (req, res, next) => {

var data = req.body 

const errors = {};
let formIsValid = true;

let msg ='Some fields are required';


if(!String(data.code).trim()){
    errors.code =msg;
    formIsValid = false;
} 


if(!String(data.fullname).trim()){
  errors.fullname =msg;
  formIsValid = false;
}

if(!String(data.email).trim()){
  errors.email =msg;
  formIsValid = false;
}


if(!String(data.telephone).trim()){
  errors.telephone =msg;
  formIsValid = false;
}



if(!formIsValid){
  return res.send({status:'error', message:'Some fields are required'})
  }else{

    sequelize.sync().then(() => {

         models.Doctor.create({
          code: data.code,
          fullname:data.fullname,
          email: data.email,
         telephone: data.telephone,
         password: bcrypt.hashSync(data.password, 10),
          status: 'Active'

        }).then(result => {
      return res.send({type:'success', message:'Doctor successfully register', status:200})

        }).catch((error) => {
         return res.send({type:'error', message:JSON.stringify(error, undefined, 2), status:500})
        }); 

      }).catch((error) => {
        return res.send({type:'error', message:JSON.stringify(error, undefined, 2), status:500})
      }); 
    }
};


  


const VerifyVendor= (req, res, next) => {

  var data = req.body 
  sequelize.sync().then(() => {
    models.Doctor.findOne({
     where: {
      [data.field]: data.data
 }
 }).then(result => {

  if(result){
    return res.send({type:'success', message:'Already registered', status:200})
  }else{
    return res.send({type:'info', message:'User not found', status:404})
  }
       
     }).catch((error) => {
      return res.send({type:'error', messageDetails:JSON.stringify(error, undefined, 2), message:'Internal Server Error', status:500})
     });
   }).catch((error) => {
     return res.send({type:'error', message:JSON.stringify(error, undefined, 2), message:'Internal Server Error', status:500})
   }); 
      
  };


  const getDoctorByPhone= (req, res, next) => {

    sequelize.sync().then(() => {
      models.Doctor.findOne({
       where: {
       telephone: req.params.telephone
   }
   }).then(result => {

    if(result){
      return res.send({type:'success', message:'Already registered', status:200})
    }else{
      return res.send({type:'error', data:[], status:404})
    }
         
       }).catch((error) => {
        return res.send({type:'error', message:JSON.stringify(error, undefined, 2), status:404})
       });
     }).catch((error) => {
       return res.send({type:'error', message:JSON.stringify(error, undefined, 2), status:404})
     }); 
        
    };


    const getDoctorProfile= (req, res, next) => {

      let query = "SELECT  d.code, d.fullname, ifnull(d.gender, '') as gender, ifnull(d.image_url, '') as image_url, d.telephone, ifnull(d.date_started,'') as date_started, ifnull(d.job_title, '') as job_title, ifnull(d.category, '') as category, ifnull(d.about, '') as about, ifnull(d.fees, 0) as fees, ifnull(d.office, '') as office, service, specification, speciality from tbl_doctors d where d.code =? ";

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


      const searchDoctor = async(req, res, next) => {
       let query = "SELECT  d.code, d.fullname, ifnull(d.gender, '') as gender, ifnull(d.image_url, '') as image_url, d.telephone, ifnull(d.date_started,'') as date_started, ifnull(d.job_title, '') as job_title, ifnull(d.category, '') as category, ifnull(d.fees, 0) as fees, ifnull(d.office, '') as office from tbl_doctors d where d.id <> '' ";

       if (req.params.title!=='' && req.params.title!=='All'){
        query = query + " AND d.category LIKE '%"+req.params.title+"%' OR d.job_title LIKE '%"+req.params.title+"%' OR  d.speciality LIKE '%"+req.params.title+"%' OR  d.about LIKE '%"+req.params.title+"%' OR d.fullname LIKE '%"+req.params.title+"%'"
       }
        sequelize.query(query,
          {
            replacements: [],
            type: sequelize.QueryTypes.SELECT
          }
      ).then(result => {
        if(result.length!==0 && Array.isArray(result)){

          return res.send({type:'success', data:result})
        }else{
          return res.send({type:'error', message:'There are no data to display'})
        }
              }).catch((error) => {
               return res.send({type:'error', message:'Internal server error', messageDetails:JSON.stringify(error, undefined, 2)})
              });
            
        };


const loginDoctor = (req, res, next) => {
  var data = req.body 

  sequelize.sync().then(() => {
       models.Doctor.findOne({
        where: {
        telephone: data.telephone
    }
    }).then(result => {

    if(result){ 

 var compare = bcrypt.compareSync(data.password, String(result.password));
  
    if(compare==false){ 
      return res.send({type:'error', message:'it looks like these are not your correct details', status:404})
              
           }else{
           

            var token = generateAccessToken(result.code);
                       return res.send({type:'success', code:result.code,  jwt:token, message:'You have successfully login'})
              }  

        }else{
       return res.send({type:'error', message:'it looks like these are not your correct details'})

           }  

        }).catch((error) => {
         return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
        });
      }).catch((error) => {
        return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
      }); 
  };




    const UpdateDoctor = (req, res, next) => {

      var data = req.body 
      
      const errors = {};
      let formIsValid = true;
      
      let msg ='Some fields are required';
      
      
if(!String(data.fullname).trim()){
  errors.fullname =msg;
  formIsValid = false;
}

if(!String(data.email).trim()){
  errors.email =msg;
  formIsValid = false;
}


if(!String(data.telephone).trim()){
  errors.telephone =msg;
  formIsValid = false;
}
      

      
      if(!formIsValid){
        return res.send({type:'error', message:'Some fields are required'})
        }else{
      
      
      
          sequelize.sync().then(() => {
              models.Doctor.update({
    
                image_url: data.image_url,
                fullname: data.fullname,
                email:data.email,
              gender: data.gender,
              telephone: data.telephone,
              speciality: data.speciality,
              about: data.about,
              service: data.service,
              experience: data.experience,
              fees: data.fees,
              category: data.category,
              date_started: data.date_started,
              job_title: data.job_title,
              office: data.office,


              },{
                where: {
                  code: data.code,
                }
              }).then(result => {
                return res.send({type:'success', message:'Doctor successfully updated', status:200})
      
              }).catch((error) => {
               return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
              });
      
            }).catch((error) => {
              return res.send({type:'error', message:JSON.stringify(error, undefined, 2)})
            }); 
          }
      };

module.exports = {
  AddNewDoctor,
getDoctorByPhone,
loginDoctor,
UpdateDoctor,
getDoctorProfile,
VerifyVendor,
searchDoctor
};
