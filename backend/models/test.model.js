const getTestModel = (sequelize, { DataTypes }) => {
  const Store = sequelize.define('tbl_lab_test', {

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

        lab_code: {
          type: DataTypes.STRING,
          allowNull: false
        },
       title: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        fees: {
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
        name:'lab_code',
        fields: ['lab_code'],
      }
      
    ]
  } 
  
  )

  sequelize.sync().then((res) => {
    console.log('tbl_lab_test successfully created');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
  
  return Store;
};

module.exports = getTestModel;
