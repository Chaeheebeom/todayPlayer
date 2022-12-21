const makePlayList = (function () {
  let columnDefine = [
    {
      type: "checkbox",
      id:'motherCheckbox',
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
  function init() {
    table.makeTableLayout("playListLeftDiv", columnDefine);
    search();
  }

  function search() {
    let params = {
      name: document.querySelector("#searchText").value,
    };
    request.get("/music", params, drawContent);
  }

  function drawContent(json) {
    let musics = json.data;

    console.log("음악", musics);
  }
  return { init: init };
})();
