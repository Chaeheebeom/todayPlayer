const main = (function () {

    function buttonevent(target) {
        request.get("/todayPlayer/page/TEST", {}, function (response) {
          document.getElementById("contentBody").innerHTML = response.data;
        });
      }


      return{buttonevent:buttonevent}
})();
