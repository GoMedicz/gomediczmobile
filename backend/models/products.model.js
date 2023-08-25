const getProductModel = (sequelize, { DataTypes }) => {
    const Products = sequelize.define('tbl_pharmacy_products', {

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
          pharmacy_code: {
            type: DataTypes.STRING,
            allowNull: false
          },

        staff_code: {
            type: DataTypes.STRING,
            allowNull: false
          },

          image_url: {
            type: DataTypes.STRING,
            allowNull: true
          },
          product_id: {
            type: DataTypes.STRING,
            allowNull: false
          },
          product_name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          category_code: {
            type: DataTypes.STRING,
            allowNull: false
          },
          subcategory_code: {
            type: DataTypes.STRING,
            allowNull: true
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: true
          },
          require_prescription: {
            type: DataTypes.BOOLEAN,
            allowNull: false
          },
          price_list: {
            type: DataTypes.JSON,
            allowNull: true
          }
    },
   {
    indexes:[
      {
        unique: false,
        name:'p_code',
        fields: ['code'],
      },
      {
        unique: false,
        name:'p_pharmacy_code',
        fields: ['pharmacy_code'],
      },
      {
        unique: false,
        name:'p_product_id',
        fields: ['product_id'],
      },
      {
        unique: false,
        name:'p_staff_code',
        fields: ['staff_code'],
      },
      {
        unique: false,
        name:'p_product_name',
        fields: ['product_name'],
      },
      {
        unique: false,
        name:'p_category_code',
        fields: ['category_code'],
      },
    ]
  } );

sequelize.sync().then(() => {
  console.log('tbl_pharmacy_products table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});


    return Products;
  };
  
  module.exports = getProductModel;