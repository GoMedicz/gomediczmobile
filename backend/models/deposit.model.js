const getDepositModel = (sequelize, { DataTypes }) => {
  const Store = sequelize.define('tbl_bank_deposit', {

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
          type: DataTypes.INTEGER,
          allowNull: false
        },
       amount: {
          type: DataTypes.FLOAT,
          allowNull: false
        },
       
        bank_name: {
          type: DataTypes.STRING,
          allowNull: false
        },
       account_number: {
          type: DataTypes.STRING,
          allowNull: false
        },
        account_name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        date_request: {
          type: DataTypes.DATEONLY,
          allowNull: true
        },
        date_paid: {
          type: DataTypes.DATEONLY,
          allowNull: true
        },
        branch_code: {
          type: DataTypes.STRING,
          allowNull: true
        },
        process_by: {
          type: DataTypes.STRING,
          allowNull: true
        },
        status: {
          type: DataTypes.STRING,
          allowNull: true
        },
        remark: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        transaction_mode: {
          type: DataTypes.STRING,
          allowNull: false
        },
        transaction_ref: {
          type: DataTypes.TEXT,
          allowNull: true
        },
  },
   {
    indexes:[
      {
        unique: false,
        name:'dep_code',
        fields: ['code'],
      },
      {
        unique: false,
        name:'dep_wallet',
        fields: ['wallet'],
      },
      {
        unique: false,
        name:'dep_date_paid',
        fields: ['date_paid'],
      },
      {
        unique: false,
        name:'dep_date_request',
        fields: ['date_request'],
      }

      
    ]
  } 
  
  )

  sequelize.sync().then((res) => {
    console.log('tbl_bank_deposit successfully created');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
  
  return Store;
};

module.exports = getDepositModel;
