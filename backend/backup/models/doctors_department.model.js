const getDoctorsDepartmentModel = (sequelize, { DataTypes }) => {
  const Store = sequelize.define('tbl_doctors_department', {

      id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        },
        code: {
          type: DataTypes.STRING,
          allowNull: false
        },

        department_code: {
          type: DataTypes.STRING,
          allowNull: false
        },
       doctor_code: {
          type: DataTypes.STRING,
          allowNull: false
        },
        hospital_code: {
          type: DataTypes.STRING,
          allowNull: false
        },
        status: {
          type: DataTypes.STRING,
          allowNull: true
        },
        remark: {
          type: DataTypes.STRING,
          allowNull: true
        }
       
  },
   {
    indexes:[
      {
        unique: false,
        name:'code',
        fields: ['code'],
      },
      {
        unique: false,
        name:'department_code',
        fields: ['department_code'],
      },
      {
        unique: false,
        name:'doctor_code',
        fields: ['doctor_code'],
      },
      {
        unique: false,
        name:'hospital_code',
        fields: ['hospital_code'],
      }
      
    ]
  } 
  
  )

  sequelize.sync().then((res) => {
    console.log('tbl_doctors_department successfully created');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
  
  return Store;
};

module.exports = getDoctorsDepartmentModel;
