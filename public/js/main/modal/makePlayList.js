const makePlayList = (function () {
  let tbodyId = "";
  let columnDefine = [
    {
      type: "checkbox",
      id: "motherCheckbox",
      name: "",
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
      key: "",
      event: { action: "click", fn: checkboxEvent },
    },
    { key: "name" },
    { key: "" },
  ];

  function checkboxEvent(event, data) {
    console.log(event);
    console.log(data);
  }

  function init() {
    addEvent();
    tbodyId = table.makeTableLayout("playListLeftDiv", columnDefine);
    search();
  }

  function addEvent() {
    document.querySelector("#addMusicBtn").onclick = addMusic;
    document.querySelector("#exceptMusicBtn").onclick = exceptMusic;
  }

  function addMusic() {
    console.log("음악더하기");
  }

  function exceptMusic() {
    console.log("음악뺴기");
  }

  function search() {
    let params = {
      name: document.querySelector("#searchText").value,
    };
    request.get("/music", params, drawContent);
  }

  function drawContent(json) {
    let musics = json.data;

    console.log("음악", musics.data);
    table.buildTable(tbodyId, musics.data, rowDefine);
  }
  return { init: init };
})();
