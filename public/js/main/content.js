const content = (function () {
  let text = "";
  let gene = "";

  function init() {
    drawGeneList();
  }

  function drawGeneList() {
    //TODO 서버로 사용자에 맞는 gene목록 가져오기
    let group = document.querySelector('#geneButtonGroup');
    let getInputTemplete = (gene) => {

      let input = document.createElement('input');
      input.type = 'radio';
      input.className = 'btn-check'
      input.name = 'btnradio'
      input.id = 'btnradio'+gene.idx;
      input.autocomplete = 'off'
      input.value = gene.gene;
      input.onclick = selectGene;
      if(gene.idx == 0){
        input.checked = true;
      }

      let label = document.createElement('label');
      label.className='btn btn-outline-primary'
      label.innerText = gene.gene;
      label.htmlFor = 'btnradio'+gene.idx;

      group.appendChild(input);
      group.appendChild(label);
    };

    let genes = [
      { idx:0, gene: "전체" },
      { idx:1,  gene: "가요" },
      { idx:2,  gene: "락" },
      { idx:3,  gene: "댄스" },
      { idx:4,  gene: "국악" },
      { idx:5,  gene: "클래식" },
    ];

    let html = [];

    genes.forEach(gene=>getInputTemplete(gene));

    console.log(html);
  }

  function getText(obj) {
    if (window.event.keyCode == 13) {
      text = obj.value;
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

  return {
    init: init,
    selectGene: selectGene,
    getText: getText,
    search: search,
  };
})();
