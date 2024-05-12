const getSubCategoryModel = (sequelize, { DataTypes }) => {
  const Category = sequelize.define('tbl_sub_category', {

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
        main_code: {
          type: DataTypes.STRING,
          allowNull: false
        },
        title: {
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
      
    ]
  } 
  
  )

  sequelize.sync().then((res) => {
    console.log('tbl_sub_category successfully created');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
  
  return Category;
};

module.exports = getSubCategoryModel;
