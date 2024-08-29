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
    await queryInterface.createTable('AuditLogDetail', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      auditLogHeaderId: {
        type: Sequelize.UUID,
        references: {
          model: 'AuditLogHeader',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      fieldName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      oldValue: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      newValue: {
        type: Sequelize.JSONB,
        allowNull: false,
      }
    });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('AuditLogDetail');
  }
};
