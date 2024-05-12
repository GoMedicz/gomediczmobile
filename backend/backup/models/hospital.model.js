const getHospitalModel = (sequelize, { DataTypes }) => {
  const Store = sequelize.define('tbl_hospital', {

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

        hospital_name: {
          type: DataTypes.STRING,
          allowNull: false
        },
       address: {
          type: DataTypes.TEXT,
          allowNull: false
        },
       map: {
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
        category: {
          type: DataTypes.TEXT,
          allowNull: false
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
        facility: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        department: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        about: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        image_list: {
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
        name:'hospital_name',
        fields: ['hospital_name'],
      }
      
    ]
  } 
  
  )

  sequelize.sync().then((res) => {
    console.log('tbl_hospital successfully created');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
  
  return Store;
};

module.exports = getHospitalModel;
