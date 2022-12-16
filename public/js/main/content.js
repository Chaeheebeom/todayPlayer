const content = (function () {
  let text = "";
  let gene = "";

  function init() {
    addEvents();
    drawGeneList();
    drawContent();
  }

  function addEvents() {
    document.querySelector("#searchText").onkeyup = getText;
  }

  function drawGeneList() {
    //TODO 서버로 사용자에 맞는 gene목록 가져오기
    let genes = [
      { idx: 0, gene: "전체" },
      { idx: 1, gene: "가요" },
      { idx: 2, gene: "락" },
      { idx: 3, gene: "댄스" },
      { idx: 4, gene: "국악" },
      { idx: 5, gene: "클래식" },
    ];
    genes.forEach((gene) => setInputTemplete(gene));
  }

  function setInputTemplete(gene) {
    let group = document.querySelector("#geneButtonGroup");

    let input = document.createElement("input");
    input.type = "radio";
    input.className = "btn-check";
    input.name = "btnradio";
    input.id = "btnradio" + gene.idx;
    input.autocomplete = "off";
    input.value = gene.gene;
    input.onclick = selectGene;
    if (gene.idx == 0) {
      input.checked = true;
    }

    let label = document.createElement("label");
    label.className = "btn btn-outline-primary";
    label.innerText = gene.gene;
    label.htmlFor = "btnradio" + gene.idx;

    group.appendChild(input);
    group.appendChild(label);
  }

  function getText() {
    if (window.event.keyCode == 13) {
      text = document.querySelector("#searchText").value;
      search();
    }
  }

  function selectGene(obj) {
    gene = obj.target.value;
    search();
  }

  function search() {
    let params = {
      text: text,
      gene: gene,
    };
    //TODO 영상조회하는 url추가
    request.get("", params, function () {});
  }

  function drawContent() {

    let svgNS = "http://www.w3.org/2000/svg";  

    let svg = document.querySelector("#svg");
    let w = parseFloat(svg.getAttributeNS(null, 'width'));
    let h = parseFloat(svg.getAttributeNS(null, 'height'));
    
    var circle = document.createElementNS(svgNS,"circle");

    circle.setAttributeNS(null,"cx"    , 800);
    circle.setAttributeNS(null,"cy"    , 400);
    circle.setAttributeNS(null,"r"     , 700);
    circle.setAttributeNS(null,"fill"  ,"#f72");
    circle.setAttributeNS(null,"stroke","none");
    circle.setAttributeNS(null,"preserveAspectRatio","xMinYMin meet")

    svg.appendChild(circle);
  }

  return {
    init: init,
  };
})();
