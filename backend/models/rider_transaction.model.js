const getRiderTransactionModel = (sequelize, { DataTypes }) => {
  const Doctor = sequelize.define('tbl_rider_transaction', {

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
       rider_code: {
          type: DataTypes.STRING,
          allowNull: false
        },

      order_code: {
          type: DataTypes.STRING,
          allowNull: false
        },
        amount: {
          type: DataTypes.STRING,
          allowNull: true
        },
       status: {
          type: DataTypes.STRING,
          allowNull: false
        },
       location: {
          type: DataTypes.STRING,
          allowNull: true
        },
        
        wallet: {
          type: DataTypes.STRING,
          allowNull: false
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
        name:'trider_code',
        fields: ['code'],
      },
      {
        unique: false,
        name:'t_order_code',
        fields: ['order_code'],
      },
      {
        unique: false,
        name:'rider_wallet',
        fields: ['wallet'],
      },
    ]
  }
  
  )

  sequelize.sync().then((res) => {
    console.log('tbl_rider_transaction successfully created');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
  
  return Doctor;
};

module.exports = getRiderTransactionModel;
