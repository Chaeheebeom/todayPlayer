let gene = "";
let name = "";
let id = "";
module.exports = {
  init: () => {
    (gene = ""), (name = ""), (id = "");
  },
  setGene: (value) => {
    if (value && value !='전체') gene = value;
  },
  setName: (value) => {
    if (value) name = value;
  },
  setId: (value) => {
    if (value) id = value;
  },
  getGene:()=>{
    return gene;
  },
  getName:()=>{
    return name;
  },
  getId:()=>{
    return id;
  }
};
