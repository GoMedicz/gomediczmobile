const getTestBookingModel = (sequelize, { DataTypes }) => {
  const Store = sequelize.define('tbl_test_booking', {

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
        order_code: {
          type: DataTypes.STRING,
          allowNull: false
        },
        user_code: {
          type: DataTypes.STRING,
          allowNull: false
        },
        lab_code: {
          type: DataTypes.STRING,
          allowNull: false
        },
        test_code: {
          type: DataTypes.STRING,
          allowNull: false
        },
        fees: {
          type: DataTypes.STRING,
          allowNull: false
        },
       status: {
          type: DataTypes.STRING,
          allowNull: false
        },
       date_order: {
          type: DataTypes.DATEONLY,
          allowNull: false
        },
       
  },
   {
    indexes:[
      {
        unique: false,
        name:'user_code',
        fields: ['user_code'],
      },
      {
        unique: false,
        name:'lab_code',
        fields: ['lab_code'],
      },
      {
        unique: false,
        name:'test_code',
        fields: ['test_code'],
      },

    ]
  } 
  
  )

  sequelize.sync().then((res) => {
    console.log('tbl_test_booking successfully created');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
  
  return Store;
};

module.exports = getTestBookingModel;
