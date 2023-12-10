//getItem is used to get data from local storage
var heroId = localStorage.getItem("id");
fetchData();
function fetchData() {
  // API call to get heros details using Fetch
  var Request = new XMLHttpRequest();
  // get hero of id.
  var pubKey = "14fc6f1b55d22345494bda7902df431f";
  var md5Hash = "e9574d69c8e2df30fe7cf289122c7223";
  var url = `https://gateway.marvel.com/v1/public/characters/${heroId}?ts=1&apikey=${pubKey}&hash=${md5Hash}`;
  Request.open("get", url, true);
  Request.send();
  Request.onload = function () {
    var response = JSON.parse(Request.response);
    // update data using fetched hero of Id.
    document.getElementById(
      "heroPic"
    ).src = `${response.data.results[0].thumbnail.path}.${response.data.results[0].thumbnail.extension}`;
    document.getElementById("HeroName").innerHTML =
      "<b>Hero Name: </b> " + response.data.results[0].name;
    document.getElementById("hero-id").innerHTML =
      "<b>Hero ID: </b> " + response.data.results[0].id;
    document.getElementById("hero-desc").innerHTML =
      "<b>Description: </b> " + response.data.results[0].description;
    // we can get More details like comics availables, series Availables, stories availables, modified, status, total, limiit, offset, code values in the API
  };
}
