const modal = (function () {
  /**
   * 모달팝업을 여는 함수
   * @param {String} key
   * @param {function} callback
   */
  function show(key, callback) {
    request.get("page/" + key, {}, function (page) {
      console.log("열려라 모달 : ", page);
      document.querySelector("#modal-content").innerHTML = page.data;
      document.querySelector("#modal-content").style.display = "block";
      if (callback) callback();
    });
  }
  /**
   * 모달팝업을 닫는 함수
   */
  function hide() {
    document
      .querySelector("#modal-content")
      .childNodes.forEach((node) => node.remove());
    document.querySelector("#modal-content").style.display = "none";
  }

  return { show: show, hide: hide };
})();
