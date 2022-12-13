let fileDAO = require("../DAO/fileDAO");

module.exports = {
  post: async function (data) {
    return await fileDAO.post(data);
  },
};
