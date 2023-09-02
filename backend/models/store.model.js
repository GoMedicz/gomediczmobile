const getStoreModel = (sequelize, { DataTypes }) => {
  const Store = sequelize.define('tbl_pharmacy_stores', {

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

        image_url: {
          type: DataTypes.STRING,
          allowNull: true
        },
        store_name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        telephone: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email_address: {
          type: DataTypes.STRING,
          allowNull: true
        },
        address: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        longitude: {
          type: DataTypes.STRING,
          allowNull: true
        },
        latitude: {
          type: DataTypes.STRING,
          allowNull: true
        },
        map_data: {
          type: DataTypes.JSON,
          allowNull: true
        }
  },
   {
    indexes:[
      {
        unique: false,
        name:'s_code',
        fields: ['code'],
      },
      {
        unique: false,
        name:'s_store_name',
        fields: ['store_name'],
      }
    ]
  } 
  
  )

  sequelize.sync().then((res) => {
    console.log('tbl_pharmacy_stores successfully created');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
  
  return Store;
};

module.exports = getStoreModel;
