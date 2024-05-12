const getAppointmentModel = (sequelize, { DataTypes }) => {
  const Store = sequelize.define('tbl_appointments', {

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

        user_code: {
          type: DataTypes.STRING,
          allowNull: false
        },
       doctor_code: {
          type: DataTypes.STRING,
          allowNull: false
        },
        appointment_date: {
          type: DataTypes.STRING,
          allowNull: false
        },
        appointment_time: {
          type: DataTypes.STRING,
          allowNull: false
        },
        title: {
          type: DataTypes.TEXT,
          allowNull: false
        },
       attachment: {
          type: DataTypes.STRING,
          allowNull: false
        },
        status: {
          type: DataTypes.STRING,
          allowNull: true
        },
        remark: {
          type: DataTypes.STRING,
          allowNull: false
        },
       
  },
   {
    indexes:[
      {
        unique: false,
        name:'app_code',
        fields: ['code'],
      },
      {
        unique: false,
        name:'app_user_code',
        fields: ['user_code'],
      },
      {
        unique: false,
        name:'app_doctor_code',
        fields: ['doctor_code'],
      }
      
    ]
  } 
  
  )

  sequelize.sync().then((res) => {
    console.log('tbl_appointment successfully created');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
  
  return Store;
};

module.exports = getAppointmentModel;
