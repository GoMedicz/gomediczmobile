const getRiderModel = (sequelize, { DataTypes }) => {
  const Doctor = sequelize.define('tbl_riders', {

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

      email: {
          type: DataTypes.STRING,
          allowNull: false
        },
        gender: {
          type: DataTypes.STRING,
          allowNull: true
        },
       password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        image_url: {
          type: DataTypes.STRING,
          allowNull: true
        },
        telephone: {
          type: DataTypes.STRING,
          allowNull: false
        },
        wallet: {
          type: DataTypes.STRING,
          allowNull: false
        },
        online_status: {
          type: DataTypes.STRING,
          defaultVaalue:'Offline',
          allowNull: true
        },
        status: {
          type: DataTypes.STRING,
          allowNull: true
        },
        latitude: {
          type: DataTypes.STRING,
          allowNull: true
        },

        longitude: {
          type: DataTypes.STRING,
          allowNull: true
        }
  },
   {
    indexes:[
     
      {
        unique: false,
        name:'rider_code',
        fields: ['code'],
      },
      {
        unique: false,
        name:'rider_email',
        fields: ['email'],
      },
    ]
  }
  
  )

  sequelize.sync().then((res) => {
    console.log('tbl_riders successfully created');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
  
  return Doctor;
};

module.exports = getRiderModel;
