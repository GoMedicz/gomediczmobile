const getOrderModel = (sequelize, { DataTypes }) => {
  const Store = sequelize.define('tbl_orders', {

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
        vendor_code: {
          type: DataTypes.STRING,
          allowNull: false
        },

        wallet: {
          type: DataTypes.STRING,
          allowNull: false
        },
        date_order: {
          type: DataTypes.DATE,
          allowNull: true
        },
       status: {
          type: DataTypes.STRING,
          allowNull: false
        },
        reference: {
          type: DataTypes.STRING,
          allowNull: true
        },
        ground_total: {
          type: DataTypes.STRING,
          allowNull: false
        },
        
       rider_code: {
          type: DataTypes.STRING,
          allowNull: true
        },
        image_url: {
          type: DataTypes.STRING,
          allowNull: true
        },
       
      
        subtotal: {
          type: DataTypes.STRING,
          allowNull: true
        },
        service_charge: {
          type: DataTypes.STRING,
          allowNull: true
        },
        items: {
          type: DataTypes.JSON,
          defaultValue: "[]",
          allowNull: true
        }
  },
   {
    indexes:[
      {
        unique: false,
        name:'order_code',
        fields: ['code'],
      },
      {
        unique: false,
        name:'order_code',
        fields: ['vendor_code'],
      },
      {
        unique: false,
        name:'order_wallet',
        fields: ['wallet'],
      },
      {
        unique: false,
        name:'order_date_order',
        fields: ['date_order'],
      },
      {
        unique: false,
        name:'order_user_code',
        fields: ['user_code'],
      }

      
    ]
  } 
  
  )

  sequelize.sync().then((res) => {
    console.log('tbl_orders successfully created');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
  
  return Store;
};

module.exports = getOrderModel;
