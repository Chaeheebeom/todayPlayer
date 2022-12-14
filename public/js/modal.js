const modal = (function () {
  /**
   * 모달팝업을 여는 함수
   * @param {String} key
   * @param {function} callback
   */
  function show(key, callback) {
    document.querySelector('#footerAudio').pause();
    request.get("page/" + key, {}, function (page) {
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
