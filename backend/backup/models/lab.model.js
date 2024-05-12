const getLabModel = (sequelize, { DataTypes }) => {
  const Store = sequelize.define('tbl_lab', {

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

        lab_name: {
          type: DataTypes.STRING,
          allowNull: false
        },
       address: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        latitude: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        longitude: {
          type: DataTypes.TEXT,
          allowNull: false
        },

        image_url: {
          type: DataTypes.TEXT,
          allowNull: true
        },
       
        status: {
          type: DataTypes.STRING,
          allowNull: true
        },
        telephone: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false
        },

        about: {
          type: DataTypes.TEXT,
          allowNull: false
        },

        facility: {
          type: DataTypes.TEXT,
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
        name:'lab_name',
        fields: ['lab_name'],
      }
      
    ]
  } 
  
  )

  sequelize.sync().then((res) => {
    console.log('tbl_lab successfully created');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
  
  return Store;
};

module.exports = getLabModel;
