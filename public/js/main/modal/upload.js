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

    makegeneList();
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
    var objectURL = URL.createObjectURL(audio);

    document.querySelector(".uploadForm").style.display = "none";
    document.querySelector(".freviewForm").style.display = "flex";
    document.querySelector("#uploadSaveBtn").style.display = "block";
    document.querySelector("#freviewAudio").src = objectURL;
  }

  function saveAudioEvent() {
    if (confirm("노래를 올리시겠습니까?")) {
      validateTitle()
        ? validateGene()
          ? fileUpload()
          : alert("장르를 선택해 주세요")
        : alert("제목을 입력해 주세요");
    }
  }

  function validateTitle() {
    let ret = true;
    if (document.querySelector("#titleText").value == "") ret = false;

    return ret;
  }

  function validateGene() {
    let ret = false;
    document
      .querySelectorAll("#geneListUl input")
      .forEach((checkbox) => (checkbox.checked ? (ret = true) : null));

    return ret;
  }

  function fileUpload() {
    let params = new FormData();
    params.append("file", audio);

    let genes = [];
    document
          .querySelectorAll("#geneListUl input")
          .forEach((checkbox) => (checkbox.checked ? genes.push(checkbox.value) : null));

    var vo = {
      title: document.querySelector("#titleText").value,
      content: document.querySelector("#contentText").value,
      gene:genes.join()
    };
    params.append("data", JSON.stringify(vo));
    file.upload(params, function (res) {
      if (res.data.response.code == 201) {
        alert("업로드완료");
        audio = null;
        modal.hide();
      }
    });
  }

  function makegeneList() {
    let geneArr = [
      "가요",
      "락",
      "재즈",
      "클래식",
      "댄스",
      "시티팝",
      "메탈",
      "힙합",
      "알앤비",
      "소울",
      "팝송",
      "뉴에이지",
      "트로트",
      "로파이",
      "제이팝",
      "오에스티",
      "만화주제가",
      "커버",
      "자작곡"
    ];

    let ul = document.querySelector("#geneListUl");

    geneArr.forEach((gene) => {
      let li = document.createElement("li");

      let input = document.createElement("input");
      input.type = "checkbox";
      input.value = gene;
      input.id = gene;
      input.onclick = (event) => {
        let isCheck = false;
        document
          .querySelectorAll("#geneListUl input")
          .forEach((checkbox) => (checkbox.checked ? (isCheck = true) : null));
        let geneDiv = document.querySelector("#geneDiv");
        isCheck
          ? (geneDiv.style.border = "1px solid black")
          : (geneDiv.style.border = "1px solid red");
      };

      let label = document.createElement("label");
      label.innerHTML = gene;
      label.htmlFor = gene;

      li.appendChild(input);
      li.appendChild(label);
      ul.append(li);
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

    let titleDiv = document.querySelector("#titleDiv");

    curLength == 0
      ? (titleDiv.style.border = "1px solid red")
      : (titleDiv.style.border = "1px solid black");
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
