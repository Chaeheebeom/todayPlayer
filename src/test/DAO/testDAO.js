const query = require('../../common/query')

let testDAO = {
  get: function (id) {
    let readQuery = ``;
    if(id==-1)
        readQuery = `MATCH (n:Music) RETURN n`;
    else 
        readQuery = `MATCH (n:Music) WHERE ID(n) = ${id} RETURN n`;
    return query.select(readQuery)
  },
};

module.exports = testDAO;
