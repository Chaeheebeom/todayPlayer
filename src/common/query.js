const connect = require("../config/connect");
const response = require("..//config/response");

let query = {
  select: async function (queryStr) {
    let readResult = await connect
      .getInstacne()
      .session.executeRead((tx) => tx.run(queryStr));

    let ret = {
      data: [],
      response: null,
    };

    readResult.records.forEach((record) => {
      let fields = record.get("n");
      let vo = {
        label: fields.labels[0],
        id: fields.identity.low,
      };

      let props = fields.properties

      for (var prop in props) {
        vo[prop] = props[prop];
      }
      ret.data.push(vo);
    });
    ret.response = response.SUCCESS;
    return ret;
  },
};

module.exports = query;
