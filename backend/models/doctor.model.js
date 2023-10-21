const getDoctorModel = (sequelize, { DataTypes }) => {
  const Doctor = sequelize.define('tbl_doctors', {

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
       fullname: {
          type: DataTypes.STRING,
          allowNull: false
        },

      email: {
          type: DataTypes.STRING,
          allowNull: false
        },
        gender: {
          type: DataTypes.STRING,
          allowNull: true
        },
       password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        image_url: {
          type: DataTypes.STRING,
          allowNull: true
        },
        telephone: {
          type: DataTypes.STRING,
          allowNull: false
        },
        speciality: {
          type: DataTypes.TEXT,
          defaultValue: "[]",
          allowNull: true
        },
        about: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        service: {
          type: DataTypes.TEXT,
          defaultValue: "[]",
          allowNull: true
        },
        experience: {
          type: DataTypes.STRING,
          allowNull: true
        },
        fees: {
          type: DataTypes.STRING,
          allowNull: true
        },
        status: {
          type: DataTypes.STRING,
          allowNull: true
        },
        latitude: {
          type: DataTypes.STRING,
          allowNull: true
        },

        longitude: {
          type: DataTypes.STRING,
          allowNull: true
        }
  },
   {
    indexes:[
     
      {
        unique: false,
        name:'doctor_code',
        fields: ['code'],
      },
      {
        unique: false,
        name:'doctor_email',
        fields: ['email'],
      },
    ]
  }
  
  )

  sequelize.sync().then((res) => {
    console.log('tbl_doctors successfully created');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
  
  return Doctor;
};

module.exports = getDoctorModel;
