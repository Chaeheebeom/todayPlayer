let musicDAO = require("../DAO/musicDAO");

module.exports = {
  get: async function (musicVO) {
    return await musicDAO.get(musicVO);
  },
};
