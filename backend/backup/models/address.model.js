const getAddressModel = (sequelize, { DataTypes }) => {
  const Store = sequelize.define('tbl_address', {

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
       type: {
          type: DataTypes.STRING,
          allowNull: false
        },
        
        address: {
          type: DataTypes.TEXT,
          allowNull: false
        },

        status: {
          type: DataTypes.TEXT,
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
      {
        unique: false,
        name:'user_code',
        fields: ['user_code'],
      }
      
    ]
  } 
  
  )

  sequelize.sync().then((res) => {
    console.log('tbl_address successfully created');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
  
  return Store;
};

module.exports = getAddressModel;
