const getPaymentModel = (sequelize, { DataTypes }) => {
  const Store = sequelize.define('tbl_payment', {

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

        wallet: {
          type: DataTypes.STRING,
          allowNull: false
        },
       user_code: {
          type: DataTypes.STRING,
          allowNull: false
        },
       amount: {
          type: DataTypes.STRING,
          allowNull: false
        },
        discount: {
          type: DataTypes.STRING,
          allowNull: true
        },
        method: {
          type: DataTypes.STRING,
          allowNull: false
        },
        order_code: {
          type: DataTypes.STRING,
          allowNull: true
        },
        status: {
          type: DataTypes.STRING,
          allowNull: true
        },
       payer: {
          type: DataTypes.STRING,
          allowNull: true
        },
        total_item: {
          type: DataTypes.STRING,
          allowNull: false
        },
        date_paid: {
          type: DataTypes.DATE,
          allowNull: true
        },
        reference: {
          type: DataTypes.STRING,
          allowNull: true
        },
        payment_data: {
          type: DataTypes.STRING,
          defaultValue: "[]",
          allowNull: true
        }
  },
   {
    indexes:[
      {
        unique: false,
        name:'pay_code',
        fields: ['code'],
      },
      {
        unique: false,
        name:'pay_wallet',
        fields: ['wallet'],
      },
      {
        unique: false,
        name:'pay_date_paid',
        fields: ['date_paid'],
      },
      {
        unique: false,
        name:'pay_user_code',
        fields: ['user_code'],
      }

      
    ]
  } 
  
  )

  sequelize.sync().then((res) => {
    console.log('tbl_payment successfully created');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
  
  return Store;
};

module.exports = getPaymentModel;
