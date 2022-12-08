const file = (function () {
  /**
   * 파일을 업로드하는 함수
   * @param {FormData} file 
   * @param {Function} callback 
   * @returns {response} 업로드한 파일을 리턴해준다.
   */
  function upload(file, callback) {
    axios({
      method: "post",
      url: "/file",
      data: file,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (callback) callback(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return { upload: upload };
})();
