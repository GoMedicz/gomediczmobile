const getSpecialityModel = (sequelize, { DataTypes }) => {
  const Speciality = sequelize.define('tbl_doctor_speciality', {

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
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        color_code: {
          type: DataTypes.STRING,
          allowNull: false
        },
        icon: {
          type: DataTypes.STRING,
          allowNull: false
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
        name:'title',
        fields: ['title'],
      },
    ]
  } 
  
  )

  sequelize.sync().then((res) => {
    console.log('tbl_doctor_speciality successfully created');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
  
  return Speciality;
};

module.exports = getSpecialityModel;
