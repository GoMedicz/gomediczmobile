const getOrderItemsModel = (sequelize, { DataTypes }) => {
  const Store = sequelize.define('tbl_order_items', {

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
        vendor_code: {
          type: DataTypes.STRING,
          allowNull: false
        },
        product_code: {
          type: DataTypes.STRING,
          allowNull: false
        },
        qty: {
          type: DataTypes.STRING,
          allowNull: false
        },
        amount: {
          type: DataTypes.STRING,
          allowNull: false
        },
        unit: {
          type: DataTypes.STRING,
          allowNull: false
        },
        reference: {
          type: DataTypes.STRING,
          allowNull: true
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
        name:'product_code',
        fields: ['product_code'],
      },
      {
        unique: false,
        name:'vendor_code',
        fields: ['vendor_code'],
      },
      {
        unique: false,
        name:'date_order',
        fields: ['date_order'],
      },

    ]
  } 
  
  )

  sequelize.sync().then((res) => {
    console.log('tbl_order_items successfully created');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
  
  return Store;
};

module.exports = getOrderItemsModel;
