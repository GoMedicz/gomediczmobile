const getCreditModel = (sequelize, { DataTypes }) => {
  const Store = sequelize.define('tbl_credit', {

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

        wallet: {
          type: DataTypes.STRING,
          allowNull: false
        },
       user_code: {
          type: DataTypes.STRING,
          allowNull: false
        },
       amount: {
          type: DataTypes.STRING,
          allowNull: false
        },
        method: {
          type: DataTypes.STRING,
          allowNull: false
        },
        date_paid: {
          type: DataTypes.DATE,
          allowNull: true
        },
        reference: {
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
      {
        unique: false,
        name:'wallet',
        fields: ['wallet'],
      }
    ]
  } 
  
  )

  sequelize.sync().then((res) => {
    console.log('tbl_credit successfully created');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
  
  return Store;
};

module.exports = getCreditModel;
