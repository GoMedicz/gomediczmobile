const getCategoryModel = (sequelize, { DataTypes }) => {
  const Category = sequelize.define('tbl_pharmacy_products_category', {

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
        parent_code: {
          type: DataTypes.STRING,
          defaultValue: "001",
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
        category_name: {
          type: DataTypes.STRING,
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
        name:'pharmacy_code',
        fields: ['pharmacy_code'],
      },
      {
        unique: false,
        name:'parent_code',
        fields: ['parent_code'],
      },
      {
        unique: false,
        name:'staff_code',
        fields: ['staff_code'],
      },
      {
        unique: false,
        name:'category_name',
        fields: ['category_name'],
      },
    ]
  } 
  
  )

  sequelize.sync().then((res) => {
    console.log('tbl_pharmacy_products_category successfully created');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
  
  return Category;
};

module.exports = getCategoryModel;
