const file = (function () {

  function upload(params, thenCallback) {
    axios({
      method: "post",
      url: "/todayPlayer/file",
      data: params,
      headers: {
        "Content-Type": "multipart/form-data",
      },
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

  return { upload: upload };
})();
