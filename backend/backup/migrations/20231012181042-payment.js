'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    /* return Promise.all([
      queryInterface.addColumn(
        'Users', // table name
        'twitter', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),


      queryInterface.addColumn(
        'Users',
        'linkedin',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Users',
        'bio',
        {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      ),
    ]); */


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    // logic for reverting the changes
   /*  return Promise.all([
      queryInterface.removeColumn('Users', 'linkedin'),
      queryInterface.removeColumn('Users', 'twitter'),
      queryInterface.removeColumn('Users', 'bio'),
    ]); */

  }
};
