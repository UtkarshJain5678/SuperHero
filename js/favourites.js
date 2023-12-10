//  getting Id of HerosCards.
var HerosCards = document.getElementById("HerosCards");

// check for heros under localStorage for favourite
for (let i = 0; i < localStorage.length; i++) {
  if (localStorage.key(i) == "id") {
    continue;
  }

  // get data from the storage
  let myStorage = JSON.parse(localStorage.getItem(localStorage.key(i)));
  var templateHerosCards = HerosCards.content.cloneNode(true);

  // create cards for favourite cards.
  templateHerosCards.getElementById(
    "heroPic"
  ).src = `${myStorage.thumbnail.path}.${myStorage.thumbnail.extension}`;
  templateHerosCards.getElementById("HeroName").innerHTML =
    "<b>Name: </b> " + myStorage.name;
  templateHerosCards
    .getElementById("about")
    .addEventListener("click", function () {
      localStorage.setItem("id", myStorage.id);
      window.location.assign("./about.html");
    });

  //remove Button eventlistener
  templateHerosCards
    .getElementById("fav-btn")
    .addEventListener("click", function () {
      myStorage.innerHTML = null;
      localStorage.removeItem(localStorage.key(i));
      window.location.assign("./favourites.html");
    });

  // Adding to list
  document.getElementById("superhero-list").appendChild(templateHerosCards);
}
