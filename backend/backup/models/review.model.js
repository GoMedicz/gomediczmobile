const getReviewModel = (sequelize, { DataTypes }) => {
  const Store = sequelize.define('tbl_reviews', {

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

        review_type: {
          type: DataTypes.STRING,
          allowNull: false
        },
       review_user_code: {
          type: DataTypes.STRING,
          allowNull: false
        },
        user_code: {
          type: DataTypes.STRING,
          allowNull: false
        },
        message: {
          type: DataTypes.TEXT,
          allowNull: false
        },
       rating: {
          type: DataTypes.STRING,
          allowNull: false
        },
        reviewed_for: {
          type: DataTypes.STRING,
          allowNull: true
        },
        date_review: {
          type: DataTypes.DATEONLY,
          allowNull: true
        },
        status: {
          type: DataTypes.STRING,
          allowNull: true
        }
       
  },
   {
    indexes:[
      {
        unique: false,
        name:'rev_code',
        fields: ['code'],
      },
      {
        unique: false,
        name:'rev_user_code',
        fields: ['user_code'],
      },
      {
        unique: false,
        name:'rev_review_type',
        fields: ['review_type'],
      }

      
    ]
  } 
  
  )

  sequelize.sync().then((res) => {
    console.log('tbl_reviews successfully created');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });
  
  return Store;
};

module.exports = getReviewModel;
