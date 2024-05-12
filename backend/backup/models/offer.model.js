const getOfferModel = (sequelize, { DataTypes }) => {
  const Store = sequelize.define('tbl_offer', {

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

        promo_code: {
          type: DataTypes.STRING,
          allowNull: false
        },
       percentage: {
          type: DataTypes.STRING,
          allowNull: false
        },
        expiry: {
          type: DataTypes.DATE,
          allowNull: false
        },
        title: {
          type: DataTypes.TEXT,
          allowNull: false
        },

        status: {
          type: DataTypes.TEXT,
          allowNull: true
        },
       
        usage_history: {
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
        name:'promo_code',
        fields: ['promo_code'],
      }
      
    ]
  } 
  
  )

  sequelize.sync().then((res) => {
    console.log('tbl_offer successfully created');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
  
  return Store;
};

module.exports = getOfferModel;
