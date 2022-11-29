const request = (function () {
  function get(url, params = {}, thenCallback = null) {
    let param = { params: params };

    axios
      .get(url, param)
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
    let param = { params: params };

    axios
      .post(url, param)
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
    let param = { params: params };

    axios
      .put(url, param)
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
    let param = { params: params };

    axios
      .patch(url, param)
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
    let param = { params: params };

    axios
      .delete(url, param)
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

  return { get: get, post: post, put: put, patch: patch, delete: deleteMethod };
})();
