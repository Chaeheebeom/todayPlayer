const main = (function () {
  function showUploadPopup() {
    modal.show("UPLOAD",upload.init);
  }

  return { showUploadPopup: showUploadPopup };
})();
