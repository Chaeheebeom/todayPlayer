const main = (function () {

  function showUploadPopup(){
    modal.show('UPLOAD',function(obj){
      console.log('팝업!',obj)
    })
  }

  return {showUploadPopup:showUploadPopup}
})();
