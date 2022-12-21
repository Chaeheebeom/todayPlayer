const playList = (function () {
  function init() {
    addEvents();
  }

  function addEvents() {
    document.querySelector("#makePlayListButton").onclick = () => {
      modal.show("MAKEPLAYLIST", makePlayList.init);
    };
  }
  return {
    init: init,
  };
})();
