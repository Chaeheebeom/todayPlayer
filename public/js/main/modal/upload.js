const upload = (function () {
  function init() {
    document.querySelector(".modal-container").ondrop = blockEvent;
    document.querySelector(".modal-container").ondragover = blockEvent;

    document.querySelector(".modal-body").ondrop = (e) => {
      blockEvent(e);
      dropFileEvent(e);
    };
    document.querySelector(".modal-body").ondragover = blockEvent;

    document.querySelector(".modal-body .clicktag").onclick = showUpload;

    document.querySelector("#input_file_upload").onchange = fileChangeEvent;
  }

  function blockEvent(event) {
    event.preventDefault();
  }

  function dropFileEvent(event) {
    let audio = event.dataTransfer.files[0];
    audio.type.includes("audio")
      ? fileUpload(video)
      : alert("음원파일이 아닙니다.");
  }

  function showUpload() {
    document.querySelector("#input_file_upload").click();
  }

  function fileChangeEvent() {
    let audio = document.querySelector("#input_file_upload").files[0];
    fileUpload(audio);
  }

  function fileUpload(audio) {
    let params = new FormData();
    params.append("file", audio);

    file.upload(params, function (res) {
      document.querySelector("#uploadForm").style.display = "none";
      document.querySelector("#freviewFrom").style.display = "flex";
      document.querySelector("audio").src = res.data.filename;
    });
  }

  return {
    init: init,
  };
})();
