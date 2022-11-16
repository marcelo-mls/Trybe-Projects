const services = require('../services/posts.service');

async function selectAllPosts(_req, res) {
  console.log('INI CONTROLLER');
  const result = await services.selectAllPosts();
  console.log('FIM CONTROLLER');
  res.status(result.status).json(result.message);
}

module.exports = {
  selectAllPosts,
};
