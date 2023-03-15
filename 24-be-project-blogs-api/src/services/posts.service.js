const { statusCode } = require('../utils/errorMap');
const { BlogPost, User, Category } = require('../models');

async function selectAllPosts() {
  console.log('INI SERVICE');
  const posts = await BlogPost.findAll({ include:
    [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  console.log(posts);
  console.log('FIM SERVICE');
  return { status: statusCode.OK, message: posts };
}

module.exports = {
  selectAllPosts,
};