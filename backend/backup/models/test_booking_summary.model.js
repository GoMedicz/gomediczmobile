const getTestBookingSummaryModel = (sequelize, { DataTypes }) => {
  const Store = sequelize.define('tbl_test_booking_summary', {

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
        order_code: {
          type: DataTypes.STRING,
          allowNull: false
        },
        subtotal: {
          type: DataTypes.STRING,
          allowNull: false
        },
        charge: {
          type: DataTypes.STRING,
          allowNull: false
        },
       date_book: {
          type: DataTypes.STRING,
          allowNull: false
        },
        time_book: {
          type: DataTypes.STRING,
          allowNull: false
        },
       total: {
          type: DataTypes.STRING,
          allowNull: false
        },
       status: {
          type: DataTypes.STRING,
          allowNull: false
        },
        address: {
          type: DataTypes.TEXT,
          allowNull: true
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
        name:'order_code',
        fields: ['order_code'],
      }

    ]
  } 
  
  )

  sequelize.sync().then((res) => {
    console.log('tbl_test_booking_summary successfully created');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
  
  return Store;
};

module.exports = getTestBookingSummaryModel;
