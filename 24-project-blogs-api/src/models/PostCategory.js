function PostCategorySchema (sequelize, DataTypes) {
  const PostCategoryTable = sequelize.define('PostCategory',
  {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      references: { model: 'blog_posts', key: 'id'}
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      references: { model: 'categories', key: 'id'}
    },
  },
  {
    tableName: 'posts_categories',
    timestamps: false,
    underscored: true,
  });

  PostCategoryTable.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategoryTable,
      as: 'categories',
      foreignKey: 'post_id',
      otherKey: 'category_id'
    });

    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategoryTable,
      as: 'blog_posts',
      foreignKey: 'category_id',
      otherKey: 'post_id'
    });
  }

  return PostCategoryTable;

}

module.exports = PostCategorySchema;
