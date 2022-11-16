function CategorySchema (sequelize, DataTypes) {
  const CategoryTable = sequelize.define('Category',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  },
  {
    tableName: 'categories',
    timestamps: false,
    underscored: true,
  });

  return CategoryTable;

}

module.exports = CategorySchema;
