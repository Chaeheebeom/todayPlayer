const makePlayList = (function () {
  let leftTbodyId = "";
  let rightTbodyId = "";

  let searchMusicList = [];
  let selectedMusicList = [];

  let picture = null;

  let columnDefine = [
    {
      type: "checkbox",
      id: "motherCheckbox",
      name: "",
      event: { action: "click", fn: motherCheckboxEvent },
      style: {
        width: "5%",
      },
    },
    {
      name: "노래이름",
      style: {
        width: "80%",
      },
    },
    {
      name: "음악가",
      style: {
        width: "15%",
      },
    },
  ];

  let rowDefine = [
    {
      type: "checkbox",
      class: "leftChildCheckbox",
    },
    { key: "name" },
    { key: "" },
  ];

  let motherChildMap = {
    leftMotherCheckbox: "leftChildCheckbox",
    rightMotherCheckbox: "rightChildCheckbox",
  };

  function motherCheckboxEvent(event, data) {
    let childId = motherChildMap[event.target.id];
    event.target.checked
      ? document
          .querySelectorAll("input." + childId)
          .forEach((checkbox) => (checkbox.checked = true))
      : document
          .querySelectorAll("input." + childId)
          .forEach((checkbox) => (checkbox.checked = false));
  }

  function init() {
    initVar();
    addEvent();
    columnDefine[0].id = "leftMotherCheckbox";
    leftTbodyId = table.makeTableLayout("playListLeftDiv", columnDefine);
    columnDefine[0].id = "rightMotherCheckbox";
    rightTbodyId = table.makeTableLayout("playListRightDiv", columnDefine);
    search();
  }

  function initVar() {
    leftTbodyId = "";
    rightTbodyId = "";

    searchMusicList = [];
    selectedMusicList = [];

    picture = null;
  }

  function addEvent() {
    document.querySelector("#addMusicBtn").onclick = addMusic;
    document.querySelector("#exceptMusicBtn").onclick = exceptMusic;
    document.querySelector("#makePlayListNextBtn").onclick = () =>
      pageChangeEvent("INPUT");
    document.querySelector("#makePlayListPreviewBtn").onclick = () =>
      pageChangeEvent("SELECT");

    document.querySelector("#choosePictureBtn").onclick = choosePictureEvent;
    document.querySelector("#makeplaylist_picture_upload").onchange =
      fileChangeEvent;
  }

  function addMusic() {
    let idx = 0;
    let isNewCheck = false;
    document.querySelectorAll("input.leftChildCheckbox").forEach((checkbox) => {
      if (checkbox.checked) {
        isNewCheck = true;
        selectedMusicList.push(searchMusicList[idx]);
      }
      idx++;
    });

    if (!isNewCheck) return;

    rowDefine[0].class = "rightChildCheckbox";
    table.buildTable(rightTbodyId, selectedMusicList, rowDefine);
  }

  function exceptMusic() {
    let idx = 0;
    let isNewCheck = false;

    let tempList = selectedMusicList.slice();
    selectedMusicList = [];
    document
      .querySelectorAll("input.rightChildCheckbox")
      .forEach((checkbox) => {
        if (!checkbox.checked) {
          selectedMusicList.push(tempList[idx]);
        } else {
          isNewCheck = true;
        }
        idx++;
      });

    if (!isNewCheck) return;

    rowDefine[0].class = "rightChildCheckbox";
    table.buildTable(rightTbodyId, selectedMusicList, rowDefine);
  }

  function choosePictureEvent() {
    document.querySelector("#makeplaylist_picture_upload").click();
  }

  function fileChangeEvent() {
    picture = document.querySelector("#makeplaylist_picture_upload").files[0];
    var objectURL = URL.createObjectURL(picture);
    document.querySelector("#picturePlaceHolder").style.display = "none";
    document.querySelector("img").src = objectURL;
  }

  let PAGE = {
    SELECT: function () {
      document.querySelector("#makePlayListPreviewBtn").style.display = "none";
      document.querySelector("#makePlayListNextBtn").style.display = "block";
      document.querySelector("#makePlayListSaveBtn").style.display = "none";

      document.querySelector("#selectMusicDiv").style.display = "grid";
      document.querySelector("#playListDataDiv").style.display = "none";

      document.querySelector("#makePlayListPreviewBtn").onclick = () =>
        pageChangeEvent("SELECT");
      document.querySelector("#makePlayListNextBtn").onclick = () =>
        pageChangeEvent("INPUT");
    },
    INPUT: function () {
      let { isFine, message } = checkMusicList();

      if (!isFine) {
        alert(message);
      } else {
        document.querySelector("#makePlayListPreviewBtn").style.display =
          "block";
        document.querySelector("#makePlayListNextBtn").style.display = "none";
        document.querySelector("#makePlayListSaveBtn").style.display = "block";

        document.querySelector("#selectMusicDiv").style.display = "none";
        document.querySelector("#playListDataDiv").style.display = "grid";

        leftTbodyId = table.makeTableLayout(
          "selectedMusicRightDiv",
          columnDefine
        );
        table.buildTable(leftTbodyId, selectedMusicList, rowDefine);

        document.querySelector("#makePlayListPreviewBtn").onclick = () =>
          pageChangeEvent("SELECT");
      }
    },
  };
  //'SELECT' 'INPUT'
  function pageChangeEvent(pageType) {
    PAGE[pageType]();
  }

  function checkMusicList() {
    let isFine = true;
    let message = "";

    if (selectedMusicList.length == 0) {
      isFine = false;
      message = "플레이리스트는 최소 3곡에서 최대 10곡까지 선택해야 합니다.";
    } else if (selectedMusicList.length < 2) {
      isFine = false;
      message = "플레이리스트는 최소 3곡은 선택해야 합니다";
    } else if (selectedMusicList.length > 10) {
      isFine = false;
      message = "플레이리스트는 최대 10곡까지 가능 합니다";
    }

    return { isFine, message };
  }

  function search() {
    let params = {
      name: document.querySelector("#searchText").value,
    };
    request.get("/music", params, drawContent);
  }

  function drawContent(json) {
    let musics = json.data;

    searchMusicList = musics.data;
    rowDefine[0].class = "leftChildCheckbox";
    table.buildTable(leftTbodyId, searchMusicList, rowDefine);
  }
  return { init: init };
})();
