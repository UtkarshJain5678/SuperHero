//  calling Marvel API
var xhrRequest = new XMLHttpRequest();
xhrRequest.open(
  "get",
  "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=14fc6f1b55d22345494bda7902df431f&hash=e9574d69c8e2df30fe7cf289122c7223",
  true
);
xhrRequest.send();
xhrRequest.onload = function () {
  var allHeros = JSON.parse(xhrRequest.responseText);
  getAllHerosList(allHeros.data.results);
};

document.getElementById("search-form").addEventListener("keyup", function () {
  var url = "";
  var heroName = document.getElementById("search-hero").value;
  if (!heroName) {
    url =
      "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=14fc6f1b55d22345494bda7902df431f&hash=e9574d69c8e2df30fe7cf289122c7223";
  } else {
    url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${heroName}&ts=1&apikey=14fc6f1b55d22345494bda7902df431f&hash=e9574d69c8e2df30fe7cf289122c7223`;
  }

  var xhrRequest = new XMLHttpRequest();
  xhrRequest.open("get", url, true);
  xhrRequest.send();
  xhrRequest.onload = function () {
    var data = JSON.parse(xhrRequest.responseText);
    showData(data);
  };
});

//Render all Heros data
function getAllHerosList(AllHeros) {
  let HerosCards = document.getElementById("HerosCards");

  // Get Search String
  let searchHero = document.getElementById("search-hero").value;
  var superHeroList = document.getElementById("superhero-list");
  superHeroList.innerHTML = "";

  for (let hero of AllHeros) {
    var templateHerosCards = HerosCards.content.cloneNode(true);
    templateHerosCards.getElementById(
      "heroPic"
    ).src = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
    templateHerosCards.getElementById("name").innerHTML = hero.name;
    templateHerosCards
      .getElementById("about")
      .addEventListener("click", function () {
        localStorage.setItem("id", hero.id);
        window.location.assign("./about.html");
      });

    //  EventListner for favorite button
    templateHerosCards
      .getElementById("fav-btn")
      .addEventListener("click", function () {
        var index = localStorage.length;
        var data = JSON.stringify(hero);

        // setting heros data to localStorage.
        localStorage.setItem(hero.id, data);
      });
    superHeroList.appendChild(templateHerosCards);
  }
}

//  Get HerosCards
let HerosCards = document.getElementById("HerosCards");
let searchHero = document.getElementById("search-hero").value;

function showData(data) {
  // Show Data on the Screen
  var superHeroList = document.getElementById("superhero-list");
  var Heros = data.data.results;

  if (Heros.length === 0) {
    //If no Hero present then show this
    alert("No hero present with this name");
    superHeroList.innerHTML = "Invalid Hero Name";
  }

  // display all superheros.
  else {
    superHeroList.innerHTML = "";

    for (let Hero of Heros) {
      var templateHerosCards = HerosCards.content.cloneNode(true);

      //  Get all the elemets from id and then changes its Inner HTMl
      templateHerosCards.getElementById(
        "heroPic"
      ).src = `${Hero.thumbnail.path}.${Hero.thumbnail.extension}`;
      templateHerosCards.getElementById("name").innerHTML = Hero.name;

      // about button click handler
      templateHerosCards
        .getElementById("about")
        .addEventListener("click", function () {
          localStorage.setItem("id", Hero.id);
          window.location.assign("./about.html");
        });

      // favouirite button click handler
      templateHerosCards
        .getElementById("fav-btn")
        .addEventListener("click", function () {
          var index = localStorage.length;
          var data = JSON.stringify(Hero);
          localStorage.setItem(Hero.id, data);
        });
      superHeroList.appendChild(templateHerosCards);
    }
  }
}

function addButtonHandler() {
  alert("Added to Favourites");
}
