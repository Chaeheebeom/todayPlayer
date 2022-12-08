const request = (function () {
  /**
   * get 요청
   * @param {string} url
   * @param {object} params
   * @param {function} thenCallback
   * @returns {Response} 요청한 데이터를 리턴
   */
  function get(url, params = {}, thenCallback = null) {
    axios({
      method: "get",
      url: url,
      data: params,
      timeout: 1000,
    })
      .then((response) => {
        if (thenCallback) thenCallback(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function (result) {
        console.log("get : ", result);
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
      })
      .then(function (result) {
        console.log("get : ", result);
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
      })
      .then(function (result) {
        console.log("get : ", result);
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
      })
      .then(function (result) {
        console.log("get : ", result);
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
      })
      .then(function (result) {
        console.log("get : ", result);
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
