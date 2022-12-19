const { session } = require("neo4j-driver");
const connect = require("../config/connect");
const response = require("../config/response");

let instance = connect.getInstacne();

let query = {
  select: async function (queryStr, key = "n") {
    console.log('queryStr : ', queryStr);
    let ret = initRet(response.FAILSELECT);
    try {
      let readResult = await instance.session.executeRead((tx) =>
        tx.run(queryStr)
      );
      ret = resultParsing(readResult, response.SUCCESSSELECT, key);
    } catch (error) {
      console.error(error);
      ret = initRet(response.FAILSELECT);
    }

    return ret;
  },
  insert: async function (queryStr, json, key="n") {
    console.log('queryStr : ', queryStr);
    let ret = initRet(response.FAILINSERT);
    try {
      const writeResult = await instance.session.executeWrite((tx) =>
        tx.run(queryStr, json)
      );
      ret = resultParsing(writeResult, response.SUCCESSINSERT, key);
    } catch (error) {
      console.error(error);
      ret = initRet(response.FAILINSERT);
    }
    return ret;
  },
  update: async function (queryStr, json, key = "n") {
    console.log('queryStr : ', queryStr);
    let ret = initRet(response.FAILUPDATE);
    try {
      const writeResult = await instance.session.executeWrite((tx) =>
        tx.run(queryStr, json)
      );
      ret = resultParsing(writeResult, response.SUCCESSUPDATE, key);
    } catch (error) {
      console.error(error);
      ret = initRet(response.FAILUPDATE);
    }
    return ret;
  },
};

function resultParsing(result, responseType, key) {
  let ret = {
    data: [],
    response: null,
  };

  result.records.forEach((record) => {
    let fields = record.get(key);
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
  ret.response = responseType;
  return ret;
}

function initRet(responseType) {
  let ret = {
    data: [],
    response: responseType,
  };
  return ret;
}

module.exports = query;
