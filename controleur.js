class Controleur {
    api_key = '1ac298995ec2f7c641fb3806216c0c04';
    ville = document.getElementById("ville").value;
    url = 'http://api.openweathermap.org/data/2.5/weather?q=' + this.ville + '&mode=xml&units=metric&appid=' + this.api_key;
    urlDrinkAlea = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    temp;
    description;
    humidity;
    wind;
    drinkName;
    drinkImage;

    loadMeteo() {
        return fetch(this.urlWeather)
            .then(reponse => reponse.text())
            .then(xmlText => {
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(xmlText, "application/xml");
                console.log(ville);
                this.temp = xmlDoc.getElementsByTagName("temperature")[0].getAttribute("value");
                this.description = xmlDoc.getElementsByTagName("weather")[0].getAttribute("value");
                this.humidity = xmlDoc.getElementsByTagName("humidity")[0].getAttribute("value");
                this.wind = xmlDoc.getElementsByTagName("speed")[0].getAttribute("value");
                return this;
            }
            );
    }

    obtenirRecetteAleatoire() {
        return fetch(this.urlDrinkAlea).then((response) => response.json())
            .then((data) => {
                this.drinkName = data.drinks[0].strDrink;
                this.drinkImage = data.drinks[0].strDrinkThumb;
                console.log(this.drinkName);
                return this;
            });
    }
};


window.onload = async function () {
    const c = await new Controleur().loadMeteo();
    await c.obtenirRecetteAleatoire();
    const vue = new Vue(c);
    await vue.afficheMeteo();
    await vue.afficheListeRecettes();

};
