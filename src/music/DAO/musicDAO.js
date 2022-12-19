const query = require("../../common/query");

let musicDAO = {
  get: function (musicVO) {
    let readQuery = ``;

    if (musicVO.getId() == "") readQuery = `MATCH (n:Music) RETURN n`;
    else readQuery = `MATCH (n:Music) WHERE ID(n) = ${id} RETURN n`;

    readQuery = `MATCH (n:Music) WHERE 1=1 `;
    if (musicVO.getName() != "")
      readQuery = readQuery + ` AND toLower(n.name) contains '${musicVO.getName()}' `;
    if (musicVO.getGene() != "")
      readQuery = readQuery + ` AND n.gene contains '${musicVO.getGene()}' `;
    readQuery = readQuery + `RETURN n`;
    return query.select(readQuery);
  },
};

module.exports = musicDAO;
