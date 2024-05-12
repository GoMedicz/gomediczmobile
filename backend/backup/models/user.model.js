

const getUserModel = (sequelize, { DataTypes }) => {

 

  const User = sequelize.define('tbl_users', {

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
        fullname: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email_address: {
          type: DataTypes.STRING,
          allowNull: false
        },

      telephone: {
          type: DataTypes.STRING,
          allowNull: false
        },

        wallet: {
          type: DataTypes.STRING,
          allowNull: false
        },
        image_url: {
          type: DataTypes.STRING,
          allowNull: true
        },
        password: {
          type: DataTypes.TEXT,
          allowNull: false
        },
       is_phone_verified: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        is_email_verified: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        status: {
          type: DataTypes.STRING,
          allowNull: true
        },

        user_group: {
          type: DataTypes.STRING,
          allowNull: true
        },
  },
   {
    indexes:[
      {
        unique: false,
        name:'u_code',
        fields: ['code'],
      },
      {
        unique: false,
        name:'u_wallet',
        fields: ['wallet'],
      },
      {
        unique: false,
        name:'u_fullname',
        fields: ['fullname'],
      },
      {
        unique: false,
        name:'u_status',
        fields: ['status'],
      },
      {
        unique: false,
        name:'u_email_address',
        fields: ['email_address'],
      },
    ]
  } 
  
  )

  sequelize.sync().then((res) => {
    console.log('tbl_users successfully created');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
  
  return User;
};

module.exports = getUserModel;
