const request = (function () {
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
    delete: deleteMethod
  };
})();
