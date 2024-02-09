const getReminderModel = (sequelize, { DataTypes }) => {
  const Store = sequelize.define('tbl_reminders', {

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
       pill_name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        days: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        times: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        day: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        time: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        unique_code: {
          type: DataTypes.TEXT,
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
        name:'user_code',
        fields: ['user_code'],
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

module.exports = getReminderModel;
