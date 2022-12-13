const query = require('../../common/query')

module.exports =  {
  post: function (data) {
    let readQuery = `
      CREATE (n:Music {name:$title,
        content:$content,
        path:$path,
        filename:$filename,
        originalfilename:$originalfilename,
        mimetype:$mimetype
      }) RETURN n;
    `;
    return query.insert(readQuery,data)
  },

};
