const connect = require("../config/connect");
const response = require("../config/response");

let instance = connect.getInstacne();

let query = {
  select: async function (queryStr) {
    let ret = initRet();
    try {
      let readResult = await instance.session.executeRead((tx) =>
        tx.run(queryStr)
      );

      ret = resultParsing(readResult);
    } catch (error) {
      console.error(error);
      ret.response = response.FAIL;
    } finally {
      await instance.session.close();
    }

    return ret;
  },
  update: async function (queryStr) {
    let ret = initRet();
    try {
      const writeResult = await instance.session.executeWrite((tx) => tx.run(queryStr));
      ret = resultParsing(writeResult);
    } catch (error) {
      console.error(error);
      ret.response = response.FAIL;
    } finally {
      await instance.session.close();
    }
  },
};

function resultParsing(result) {
  let ret = {
    data: [],
    response: null,
  };

  result.records.forEach((record) => {
    let fields = record.get("n");
    let vo = {
      label: fields.labels[0],
      id: fields.identity.low,
    };

    let props = fields.properties;

    for (var prop in props) {
      vo[prop] = props[prop];
    }
    ret.data.push(vo);
  });
  ret.response = response.SUCCESS;
  return ret;
}

function initRet() {
  let ret = {
    data: [],
    response: response.FAIL,
  };
  return ret;
}

module.exports = query;
