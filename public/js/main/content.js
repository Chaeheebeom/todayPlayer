const content = (function () {
  let gene = "";

  function init() {
    addEvents();
    drawGeneList();
    search();
  }

  function addEvents() {
    document.querySelector("#searchText").onkeyup = getText;
    document.querySelector("#searchBtn").onclick = search;
  }

  function drawGeneList() {
    //TODO 서버로 사용자에 맞는 gene목록 가져오기
    request.get("genes", {}, function (json) {
      let genes = json.data;
      genes.unshift('전체')
      idx = 0;
      genes.forEach((gene) => setInputTemplete(gene));
    });
  }

  let idx = 0;

  function setInputTemplete(gene) {
    let group = document.querySelector("#geneButtonGroup");

    let input = document.createElement("input");
    input.type = "radio";
    input.className = "btn-check";
    input.name = "btnradio";
    input.id = "btnradio" + idx;
    input.autocomplete = "off";
    input.value = gene;
    input.onclick = selectGene;
    if (idx == 0) {
      input.checked = true;
    }

    let label = document.createElement("label");
    label.className = "btn btn-outline-primary";
    label.innerText = gene;
    label.htmlFor = "btnradio" + idx++;

    group.appendChild(input);
    group.appendChild(label);
  }

  function getText() {
    if (window.event.keyCode == 13) {
      search();
    }
  }

  function selectGene(obj) {
    gene = obj.target.value;
    search();
  }

  function search() {
    let params = {
      name: document.querySelector("#searchText").value,
      gene: gene,
    };
    request.get("/music", params, drawContent);
  }

  function drawContent(json) {
    let musics = json.data;

    let container = document.querySelector("div.content-container");

    while (container.hasChildNodes()) {
      container.removeChild(container.firstChild);
    }

    musics.data.forEach((music) => {
      let item = document.createElement("div");
      item.className = "item clicktag";
      item.innerHTML = music.name;
      item.onclick = () => {
        console.log(music.path);
        document.querySelector(".footer-container").classList.add("appear");
        document.querySelector("#footerAudio").src = music.filename;
        document.querySelector("#footerAudio").play();
      };

      container.appendChild(item);
    });
  }

  return {
    init: init,
  };
})();
