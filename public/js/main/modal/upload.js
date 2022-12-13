const upload = (function () {
  let audio = null;
  function init() {
    audio = null;
    document.querySelector(".modal-container").ondrop = blockEvent;
    document.querySelector(".modal-container").ondragover = blockEvent;

    document.querySelector(".modal-body").ondrop = (e) => {
      blockEvent(e);
      dropFileEvent(e);
    };
    document.querySelector(".modal-body").ondragover = blockEvent;

    document.querySelector(".modal-body .clicktag").onclick = showUpload;

    document.querySelector("#input_file_upload").onchange = fileChangeEvent;

    document.querySelector("#titleText").onkeypress = textChangeEvent;
    document.querySelector("#titleText").onkeyup = textChangeEvent;
    document.querySelector("#contentText").onkeypress = textChangeEvent;
    document.querySelector("#contentText").onkeyup = textChangeEvent;

    document.querySelector("#selectedPlayListDiv").onclick = showPlayListEvent;

    document.querySelector("#savePlayListBtn").onclick = savePlayListEvent;

    document.querySelector("#uploadSaveBtn").onclick = saveAudioEvent;
  }

  function blockEvent(event) {
    event.preventDefault();
  }

  function dropFileEvent(event) {
    audio = event.dataTransfer.files[0];
    audio.type.includes("audio")
      ? showFreviewEvent(video)
      : alert("음원파일이 아닙니다.");
  }

  function showUpload() {
    document.querySelector("#input_file_upload").click();
  }

  function fileChangeEvent() {
    audio = document.querySelector("#input_file_upload").files[0];
    showFreviewEvent();
  }

  function showFreviewEvent() {
    console.log(audio);
    var objectURL = URL.createObjectURL(audio);

    document.querySelector(".uploadForm").style.display = "none";
    document.querySelector(".freviewForm").style.display = "flex";
    document.querySelector("#uploadSaveBtn").style.display = "block";
    document.querySelector("#freviewAudio").src = objectURL;
  }

  function saveAudioEvent() {
    if (confirm("노래를 올리시겠습니까?")) {
      validateText() ? fileUpload() : alert("제목을 입력해 주세요");
    }
  }

  function validateText() {
    let ret = true;
    if (document.querySelector("#titleText").value == "") ret = false;

    return ret;
  }

  function fileUpload() {
    let params = new FormData();
    params.append("file", audio);

    var vo = {
      title: document.querySelector("#titleText").value,
      content: document.querySelector("#contentText").value,
    };
    params.append("data", JSON.stringify(vo));
    file.upload(params, function (res) {
      console.log(res)
      if (res.data.response.code == 201) {
        alert("업로드완료");
        audio = null;
        modal.hide();
      }
    });
  }

  function textChangeEvent(event) {
    let maxLength = event.target.maxLength;
    let curLength = event.target.value.length;

    let footer = event.target.nextElementSibling;

    footer.innerHTML = String(curLength) + "/" + String(maxLength);

    let footerColor = "black";
    maxLength == curLength ? (footerColor = "red") : (footerColor = "black");
    footer.style.color = footerColor;
  }

  function showPlayListEvent() {
    document.querySelector("#selectedPlayListDiv").style.display = "none";
    document.querySelector("#playListDiv").style.display = "flex";
  }

  function showSelectedPlayListEvent() {
    document.querySelector("#selectedPlayListDiv").style.display = "block";
    document.querySelector("#playListDiv").style.display = "none";
  }

  function savePlayListEvent() {
    //체크박스 중에 선택한 것 가져오기 없으면 선택
    //가져온것 재생목록에 표출
    //토글
    showSelectedPlayListEvent();
  }

  return {
    init: init,
  };
})();
