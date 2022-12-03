const modal = (function () {
  function show(key, callback) {
    request.get("todayPlayer/page/" + key, {}, function (page) {
      console.log(page);
      document.querySelector("#modal-content").innerHTML = page.data;
      document.querySelector("#modal-content").style.display = "block";

      if (callback) callback();
    });
  }

  function hide(){
    document.querySelector('#modal-content').childNodes[0].remove();
    document.querySelector('#modal-content').style.display='none';
  }

  return {show:show,hide:hide}
})();
