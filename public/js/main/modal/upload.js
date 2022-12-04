const upload = (function () {
  function showUpload() {
    document.querySelector("#input_file_upload").click();
  }

  function fileUpload() {
    let video = document.querySelector('#input_file_upload').files[0]
    
    let params = new FormData();
    params.append('file',video);

    file.upload(params,function(res){
        document.querySelector('#uploadForm').style.display = 'none';
        document.querySelector('#freviewFrom').style.display = 'flex';
        document.querySelector('video').src = res.data.filename;
    })
  }

  return {
    showUpload: showUpload,
    fileUpload: fileUpload,
  };
})();
