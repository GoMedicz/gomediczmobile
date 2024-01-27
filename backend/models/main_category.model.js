const getMainCategoryModel = (sequelize, { DataTypes }) => {
  const Category = sequelize.define('tbl_category', {

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
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        color: {
          type: DataTypes.STRING,
          allowNull: true
        },
     image_url: {
          type: DataTypes.STRING,
          allowNull: true
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
    console.log('tbl_category successfully created');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
  
  return Category;
};

module.exports = getMainCategoryModel;
