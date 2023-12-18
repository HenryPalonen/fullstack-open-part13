module.exports = {
    up: async ({ context: queryInterface }) => {
      await queryInterface.createTable('reading_lists', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
        },
        blogId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'blogs', key: 'id' },
        },
        isRead: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      });
    },
    down: async ({ context: queryInterface }) => {
      await queryInterface.dropTable('reading_lists');
    },
  };
  