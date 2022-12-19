const request = (function () {
  /**
   * get 요청
   * @param {string} url
   * @param {object} params
   * @param {function} thenCallback
   * @returns {Response} 요청한 데이터를 리턴
   */
  function get(url, params = {}, thenCallback = null) {
    let paramUrl = "";
    for (key in params) {
      if (params[key] != "")
        paramUrl = paramUrl + key + "=" + params[key] + "&";
    }
    paramUrl = paramUrl.substring(0, paramUrl.length - 1);
    axios({
      method: "get",
      url: url + "?" + paramUrl,
      data: params,
      timeout: 1000,
    })
      .then((response) => {
        if (thenCallback) thenCallback(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  /**
   * post 요청
   * @param {string} url
   * @param {object} params
   * @param {function} thenCallback
   * @returns {Response} 요청한 데이터를 리턴
   */
  function post(url, params = {}, thenCallback = null) {
    axios({
      method: "post",
      url: url,
      data: params,
      timeout: 1000,
    })
      .then((response) => {
        if (thenCallback) thenCallback(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  /**
   * put 요청
   * @param {string} url
   * @param {object} params
   * @param {function} thenCallback
   * @returns {Response} 요청한 데이터를 리턴
   */
  function put(url, params = {}, thenCallback = null) {
    axios({
      method: "put",
      url: url,
      data: params,
      timeout: 1000,
    })
      .then((response) => {
        if (thenCallback) thenCallback(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  /**
   * patch 요청
   * @param {string} url
   * @param {object} params
   * @param {function} thenCallback
   * @returns {Response} 요청한 데이터를 리턴
   */
  function patch(url, params = {}, thenCallback = null) {
    axios({
      method: "patch",
      url: url,
      data: params,
      timeout: 1000,
    })
      .then((response) => {
        if (thenCallback) thenCallback(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  /**
   * delete 요청
   * @param {string} url
   * @param {object} params
   * @param {function} thenCallback
   * @returns {Response} 요청한 데이터를 리턴
   */
  function deleteMethod(url, params = {}, thenCallback = null) {
    axios({
      method: "delete",
      url: url,
      data: params,
      timeout: 1000,
    })
      .then((response) => {
        if (thenCallback) thenCallback(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return {
    get: get,
    post: post,
    put: put,
    patch: patch,
    delete: deleteMethod,
  };
})();
