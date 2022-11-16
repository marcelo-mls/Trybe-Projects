function BlogPostSchema (sequelize, DataTypes) {
  const BlogPostTable = sequelize.define('BlogPost',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, references: { model: 'user', key: 'id'} },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    tableName: 'blog_posts',
    timestamps: false,
    underscored: true,
  });

  BlogPostTable.associate = (models) => {
    BlogPostTable.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
  }

  return BlogPostTable;

}

module.exports = BlogPostSchema;
