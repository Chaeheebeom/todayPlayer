const modal = (function () {
  function show(key, callback) {
    request.get("page/" + key, {}, function (page) {
      console.log('열려라 모달 : ',page);
      document.querySelector("#modal-content").innerHTML = page.data;
      document.querySelector("#modal-content").style.display = "block";
      if (callback) callback();
    });
  }

  function hide(){
    document.querySelector('#modal-content').childNodes.forEach(node=>node.remove())
    document.querySelector('#modal-content').style.display='none';
  }

  return {show:show,hide:hide}
})();
