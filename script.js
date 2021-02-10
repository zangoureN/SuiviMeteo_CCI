var maVille = document.getElementsByClassName("ville");
let temp = document.querySelectorAll("#temp");
let description = document.querySelectorAll("#desc");
let locationIcon = document.getElementsByClassName("imageMeteo");

function showCity() {
  // 1. Récupérer la valeur courante du menu

  let nomVilleSelectionnee = document.getElementById("listeVilles").value;

  // 2. Récupérer la liste de toutes les div correspondant à une div de météo

  let cities = document.getElementsByClassName("city");
  console.log(cities);

  // 3. Parcourir la liste des div et cacher celles qui ne sont pas sélectionnées.

  for (var i = 0; i < cities.length; i++) {
    if (cities[i].id == nomVilleSelectionnee) {
      console.log(cities[i]);
      cities[i].style.display = "inline";
      e = temp[i];
      d = description[i];
      image = locationIcon[i];
    } else {
      cities[i].style.display = "none";
    }
  }

  // Récupération des de la température, la déscription et de l'icone via l'API.
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      nomVilleSelectionnee +
      "&units=metric&appid=0115e6547246dd2ed07c8c6cd2062158"
  )
    // Réception des données JSON
    .then((response) => response.json())

    .then((data) => {
      var tempValue = data["main"]["temp"]; // Valeur de la température.
      var descValue = data["weather"][0]["description"]; // Déscription de la température
      var iconCode = data["weather"][0].icon; // Icon ( image )
      var imgDesc = data["weather"][0].description; // Description de l'image ( alt )

      e.innerHTML = Math.round(tempValue) + " ° C, ";
      d.innerHTML = descValue;
      var iconUrl = " http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
      image.src = iconUrl;
      image.alt = imgDesc;
    })

    // Gestion des erreurs

    .catch((err) => alert("ville introuvable"));
}
