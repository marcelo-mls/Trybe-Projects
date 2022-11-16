function UserSchema (sequelize, DataTypes) {
  const UserTable = sequelize.define('User',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    tableName: 'users',
    timestamps: false,
    underscored: true,
  });

  UserTable.associate = (models) => {
    UserTable.hasMany(models.BlogPost, { foreignKey: 'user_id', as: 'userId' })
  }

  return UserTable;

}

module.exports = UserSchema;
