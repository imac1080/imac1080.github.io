var webHeroku = "https://instantphoto.herokuapp.com";

$(function () {
})
var fotosArray;
function ServidorLevantado() {
  fetch(webHeroku + '/buscarFotos', {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    }).then(json => {
      console.log(json)
      //btn anadir img
      var btnAddImg = document.createElement('div');
      btnAddImg.style = 'height: 13%; display: flex; width: 100%;position: absolute;';
      btnAddImg.innerHTML = '<div id="loader" style="display: none;align-self: center;margin-left: auto;margin-right: 1em;margin-top: 1em;"></div><button type="button" onclick="document.getElementById(' + "'file-input'" + ').click();" class="btn btn-secondary" style="z-index: 3;box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px; align-self: center;display: inline-block;margin-right: 5%;margin-left: auto; margin-top: 1em;" data-toggle="tooltip" data-placement="left"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16">' +
        '<path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"></path>' +
        '<path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"></path></svg></button>'
      document.body.insertBefore(btnAddImg, document.body.childNodes[0])
      fotosArray = json;
      if (json.length != 0) {
        BuscarFoto();
      } else {
        document.getElementById("loader-2").style.display = "none";
        document.getElementById("noMoreImg").style.display = "block";
      }
      setTimeout(() => document.getElementById("animTarget").className = "hide", 1000);
      setTimeout(() => document.getElementById("animTarget2").className = "hide", 1000);
    })
    .catch((error) => {
      document.getElementById("loader-2").style.display = "none";
      document.getElementById("noMoreImg").style.display = "block";
      document.getElementById("noMoreImg").childNodes[0].textContent = "Server Internal Error";
    });
}
async function BuscarFoto() {
  for (var i = 0; i < fotosArray.length; i++) {
    await fetch(webHeroku + '/buscarFoto', {
      method: 'POST',
      body: JSON.stringify({
        id: fotosArray[i]._id
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    })
      .then(response2 => {
        return response2.json();
      }).then(json2 => {
        //console.log(json2)
        if (json2.length != 0) {
          var image = new Image();
          var divimg = document.createElement('div');
          image.style = "box-shadow: 10px 10px grey;width: 100%; max-width: 1000pt; height: max-content; min-height: 20%; margin: auto; max-height: 100%; position: absolute; left: 0; right: 0; top: 0; bottom: 0;";
          image.src = json2[0].formato + json2[0].fotoid;
          image.setAttribute('id', json2[0]._id);
          divimg.style = "display: flex; position: relative; align-self: center; width: 100%;height: 100%;"
          divimg.innerHTML = '<div class="positioning" onclick="PasarFoto(1)"></div><div class="positioning" onclick="PasarFoto(0)" style="top: 50%;"></div>';
          divimg.appendChild(image);
          if (document.getElementById("DivPhotos").children.length != 0) {
            divimg.style.display = "none";
          }
          document.getElementById("DivPhotos").appendChild(divimg);
          document.getElementById("loader-2").style.display = "none";

        } else {
          document.getElementById("loader-2").style.display = "none";
          document.getElementById("noMoreImg").style.display = "block";
          fotosArray.splice(i, 1);
          i--;
          //console.log(fotosArray)
        }

        setTimeout(() => document.getElementById("animTarget").className = "hide", 1000);

        /*
                var c = document.createElement('canvas');
                c.height = image.naturalHeight;
                c.width = image.naturalWidth;
                var ctx = c.getContext('2d');
        
                ctx.drawImage(image, 0, 0, c.width, c.height);
                var base64String = c.toDataURL();*/
      })
  }
}

var timeouts = [];

function PasarFoto(img) {
  document.getElementById("loader-2").style.display = "block";
  for (var i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i]);
  }
  //quick reset of the timer array you just cleared
  timeouts = [];

  //console.log(img)
  //console.log(fotosArray)
  document.getElementById("DivPhotos").children[0].children[0].removeAttribute("onclick");
  document.getElementById("DivPhotos").children[0].children[1].removeAttribute("onclick");
  if (document.getElementById("DivPhotos").children[0].children[2].id == fotosArray[fotosArray.length - 1]._id) {
    document.getElementById("loader-2").style.display = "none";
    document.getElementById("noMoreImg").style.display = "block";
  }
  else {
    //document.getElementById("loader-2").style.display = "block";
    document.getElementById("noMoreImg").style.display = "none";
  }
  var index = -1;
  var filteredObj = fotosArray.find(function (item, i) {
    if (item._id === document.getElementById("DivPhotos").children[0].children[2].id) {
      index = i;
      return i;
    }
  });
  var vote2 = 0;
  if (img == 1) {
    vote2 = 1;
    document.getElementById("arrowUp").style.display = "none";
    document.getElementById("h1Up").textContent = fotosArray[index].votes + 1;
    timeouts.push(setTimeout(() => document.getElementById("arrowUp").style.display = "block", 100));
    timeouts.push(setTimeout(() => document.getElementById("arrowUp").style.display = "none", 2100));
  } else {
    document.getElementById("arrowDown").style.display = "none";
    document.getElementById("h1Down").textContent = fotosArray[index].votes - 1;
    timeouts.push(setTimeout(() => document.getElementById("arrowDown").style.display = "block", 100));
    timeouts.push(setTimeout(() => document.getElementById("arrowDown").style.display = "none", 2000));

  }


  //console.log(document.getElementById("DivPhotos").children[0].children[1].id)

  fetch(webHeroku + '/vote', {
    method: 'POST',
    body: JSON.stringify({
      id: document.getElementById("DivPhotos").children[0].children[2].id, vote: vote2
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    }
  })
  .then(response =>  {
    return response.json();
  }).then(json => {
    //console.log(json)
    if (document.getElementById("DivPhotos").children.length == 1) {
      document.getElementById("DivPhotos").removeChild(document.getElementById("DivPhotos").children[0]);
      return;
    }
    document.getElementById("DivPhotos").children[1].style.display = "block";
    document.getElementById("DivPhotos").removeChild(document.getElementById("DivPhotos").children[0]);
  });
  //console.log(vote2)

}

function addPhoto() {
  if (document.getElementById("file-input").files[0].size > 4 * 1024 * 1024) {
    $('[data-toggle="tooltip"]').tooltip({ trigger: 'manual', title: "Error: Maximum file size allowed is 4 MB" });
    $('[data-toggle="tooltip"]').tooltip('show');
    $('[data-toggle="tooltip"]').on('shown.bs.tooltip', function () {
      setTimeout(function () { $('[data-toggle="tooltip"]').tooltip('hide'); setTimeout(function () { $('[data-toggle="tooltip"]').tooltip('dispose'); }, 100); }, 2000);
    })
  }
  else {
    //loaderON
    document.getElementById("loader").style.display = "inline-block";
    document.getElementsByClassName("bi-camera")[0].parentNode.style.marginLeft = 0;

    const fileInput = document.getElementById("file-input");
    const formData = new FormData();

    formData.append('file', fileInput.files[0]);

    fetch(webHeroku + '/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        //loaderOFF   
        document.getElementById("loader").style.display = "none";
        document.getElementsByClassName("bi-camera")[0].parentNode.style.marginLeft = "auto";

        return response.json();
      }).then(json => {
        if (json.srcImage == "badformat") {
          $('[data-toggle="tooltip"]').tooltip({ trigger: 'manual', title: "Error: Corrupted file or unsupported file type." });
          $('[data-toggle="tooltip"]').tooltip('show');
          $('[data-toggle="tooltip"]').on('shown.bs.tooltip', function () {
            setTimeout(function () { $('[data-toggle="tooltip"]').tooltip('hide'); setTimeout(function () { $('[data-toggle="tooltip"]').tooltip('dispose'); }, 100); }, 2000);
          })
        }
        else
          if (json.srcImage == "duplicated") {
            $('[data-toggle="tooltip"]').tooltip({ trigger: 'manual', title: "Error: Duplicate file exists." });
            $('[data-toggle="tooltip"]').tooltip('show');
            $('[data-toggle="tooltip"]').on('shown.bs.tooltip', function () {
              setTimeout(function () { $('[data-toggle="tooltip"]').tooltip('hide'); setTimeout(function () { $('[data-toggle="tooltip"]').tooltip('dispose'); }, 100); }, 2000);
            })
          }
          else {
            fotosArray.push({ _id: json._id, votes:0 });
            //console.log(fotosArray)
            var image = new Image();
            var divimg = document.createElement('div');
            image.style = "box-shadow: 10px 10px grey;width: 100%; max-width: 1000pt; height: max-content; min-height: 20%; margin: auto; max-height: 100%; position: absolute; left: 0; right: 0; top: 0; bottom: 0;";
            image.src = json.srcImage;
            image.setAttribute('id', json._id);
            divimg.style = "display: flex; position: relative; align-self: center; width: 100%;height: 100%;"
            divimg.innerHTML = '<div class="positioning" onclick="PasarFoto(1)"></div><div class="positioning" onclick="PasarFoto(0)" style="top: 50%;"></div>';
            divimg.appendChild(image);
            if (document.getElementById("DivPhotos").children.length != 0) {
              divimg.style.display = "none";
            }
            document.getElementById("DivPhotos").appendChild(divimg);
            /*
                        var image = new Image();
                        image.style.width = "100%"; image.style.alignSelf = "center"; image.style.maxHeight = "90%"; image.style.maxWidth = "1000pt";
                        image.style.marginLeft = "auto"; image.style.marginRight = "auto";
                        image.src = json.srcImage;
                        if (document.getElementById("DivPhotos").children.length != 0)
                          image.style.display = "none";
                        image.setAttribute('onclick', "PasarFoto(this)");
                        document.getElementById("DivPhotos").appendChild(image);*/

            $('[data-toggle="tooltip"]').tooltip({ trigger: 'manual', title: "Done" });
            $('[data-toggle="tooltip"]').tooltip('show');
            $('[data-toggle="tooltip"]').on('shown.bs.tooltip', function () {
              setTimeout(function () { $('[data-toggle="tooltip"]').tooltip('hide'); setTimeout(function () { $('[data-toggle="tooltip"]').tooltip('dispose'); }, 100); }, 2000);
            })
          }

      })
  }

  /*
  function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }
  
  
  
      readFile(document.getElementById("file-input").files[0], function(e) {
        //console.log(Buffer.from(e.target.result, 'base64').toString('base64'));
        fetch(webHeroku+'/upload3',{
          method:'POST',
          body:JSON.stringify({
              fotoid:e.target.result
          }),
          headers:{
              "Content-Type":"application/json; charset=UTF-8"
          }
      })       
      .then(response=>{
        return response.json();
    }).then(json=>{
        console.log(json)
      })
    });*/
}
/*
   function readFile(file, onLoadCallback){
    var reader = new FileReader();
    reader.onload = onLoadCallback;
    reader.readAsDataURL(file);
}*/