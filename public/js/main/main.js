const main = (function () {
  let isOpenLeftMenu = true;

  function init() {
    setEvent();
    call("CONTENT", content.init);
  }

  function setEvent() {
    document.querySelector("#uploadButton").onclick = () => {
      modal.show("UPLOAD", upload.init);
    };

    document.querySelector("#leftMenuControl").onclick = () => {
      console.log("leftMenuControl");

      if (isOpenLeftMenu) {
        document.querySelectorAll(".liLabel").forEach((label) => {
          label.classList.remove("appear");
          label.classList.add("disappear");
        });

        setTimeout(function () {
          document.querySelector(".left-container").style.width = "5vh";
        }, 800);

        isOpenLeftMenu = false;
      } else {
        document.querySelector(".left-container").style.width = "20vh";
        setTimeout(function () {
          document.querySelectorAll(".liLabel").forEach((label) => {
            label.classList.remove("disappear");
            label.classList.add("appear");
          });
        }, 300);

        isOpenLeftMenu = true;
      }
    };
  }

  function call(key, callback) {
    request.get("page/" + key, {}, function (page) {
      document.querySelector("#contentBody").innerHTML = page.data;
      if (callback) callback();
    });
  }

  return {
    init: init,
    call: call,
  };
})();
