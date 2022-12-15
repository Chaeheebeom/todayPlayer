const file = (function () {
  /**
   * 파일을 업로드하는 함수
   * @param {FormData} file 
   * @param {Function} callback 
   * @returns {Response} 업로드결과 리턴
   */
  function upload(file, callback) {
    axios({
      method: "post",
      url: "/file",
      data: file,
      headers: {
        "Content-Type": "multipart/form-data; charset=UTF-8",
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
