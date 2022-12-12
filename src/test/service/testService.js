let testDAO = require("../DAO/testDAO");

module.exports = {
  get: async function (id = -1) {
    return await testDAO.get(id);
  },
};
