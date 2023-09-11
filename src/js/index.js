const searchBtn = document.querySelector(".search__btn");
const search = document.querySelector(".search");

searchBtn.addEventListener("click", () => {
  const searchInput = document.querySelector(".search__input");
  const ApiKey = "85d4918c3352e05e069d197ec181000c";

  //Se não informar nenhuma cidade
  if (searchInput.validity.valueMissing) {
    clearLastQuery();
    let alertaContainer = document.createElement("div");
    let alerta = document.createElement("div");
    alertaContainer.classList.add("notFound");
    alerta.classList.add("notFoundText");
    alerta.textContent = "Necessário informar a cidade!";
    alertaContainer.appendChild(alerta);
    search.appendChild(alertaContainer);
    return;
  }

  //Se informar a cidade (ou algum texto)
  //Request
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${ApiKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      //Limpa conteúdo antes de recriar
      clearLastQuery();

      //Se não encontrar
      if (json.cod == 404 || json.cod == 400) {
        let notFound = document.createElement("div");
        let notFoundImg = document.createElement("img");
        let notFoundText = document.createElement("div");

        notFound.classList.add("notFound");
        notFoundText.classList.add("notFoundText");

        notFoundImg.src = "./src/img/notfound.png";
        notFoundImg.alt = "Localização não encontrada";
        notFoundImg.width = 250;
        notFoundText.textContent = "Localização não encontrada!";

        notFound.appendChild(notFoundImg);
        notFound.appendChild(notFoundText);
        search.appendChild(notFound);
      }

      //Se encontrar
      else {
        //Criando os elementos
        //MAIN
        const weatherContainer = document.createElement("div"); //document.querySelector(".weather__container");
        const weatherContainerInfo = document.createElement("div"); //document.querySelector(".weather__container__info");
        const weatherDetailsContainer = document.createElement("div"); //document.querySelector(".weather__details__container");

        //Temperatura e Clima
        const weatherImg = document.createElement("img");
        const tempMax = document.createElement("div");
        const tempMin = document.createElement("div");
        const temp = document.createElement("div");
        const weatherText = document.createElement("div");
        const temperatures = document.createElement("div");

        //Umidade
        const humidity = document.createElement("div");
        const humidityContainer = document.createElement("div");
        const humidityImg = document.createElement("img");

        //Vento
        const windSpeed = document.createElement("div");
        const windSpeedContainer = document.createElement("div");
        const windSpeedImg = document.createElement("img");

        //Adicionando as Classes CSS
        //MAIN
        weatherContainer.classList.add("weather__container");
        weatherContainerInfo.classList.add("weather__container__info");
        weatherDetailsContainer.classList.add("weather__details__container");

        //Temperatura e Clima
        tempMax.classList.add("infoMasterMax");
        tempMin.classList.add("infoMasterMin");
        temp.classList.add("infoMaster");
        weatherText.classList.add("infoText");
        temperatures.classList.add("temperatures");

        //Umidade
        humidity.classList.add("info");
        humidityContainer.classList.add("humidity");

        //Vento
        windSpeed.classList.add("info");
        windSpeedContainer.classList.add("windSpeed");

        //Alterando valores aos elementos
        //Clouds, Clear, Rain, Haze, Snow
        switch (json.weather[0].main) {
          case "Clear":
            weatherImg.src = "./src/img/limpo.png";
            weatherImg.alt = "Limpo";
            weatherText.textContent = "Limpo";
            break;

          case "Clouds":
            weatherImg.src = "./src/img/nublado.png";
            weatherImg.alt = "Nublado";
            weatherText.textContent = "Nublado";
            break;

          case "Rain":
            weatherImg.src = "./src/img/chovendo.png";
            weatherImg.alt = "Chovendo";
            weatherText.textContent = "Chovendo";
            break;

          case "Snow":
            weatherImg.src = "./src/img/nevando.png";
            weatherImg.alt = "Nevando";
            weatherText.textContent = "Nevando";
            break;

          case "Haze":
          case "Fog":
          case "Mist":
          case "Smoke":
            weatherImg.src = "./src/img/neblina.png";
            weatherImg.alt = "Neblina";
            weatherText.textContent = "Neblina";
            break;

          case "Thunderstorm":
            weatherImg.src = "./src/img/tempestadeRaios.png";
            weatherImg.alt = "Tempestade de Raios";
            weatherText.textContent = "Tempestade de Raios";
            break;

          case "Squall":
            weatherImg.src = "./src/img/tempestade.png";
            weatherImg.alt = "Tempestade";
            weatherText.textContent = "Tempestade";
            break;

          case "Tornado":
            weatherImg.src = "./src/img/tornado.png";
            weatherImg.alt = "Tornado";
            weatherText.textContent = "Tornado";
            break;

          case "Drizzle":
            weatherImg.src = "./src/img/garoa.png";
            weatherImg.alt = "Garoando";
            weatherText.textContent = "Garoando";
            break;

          case "Dust":
          case "Sand":
          case "Ash":
            weatherImg.src = "./src/img/sandash.png";
            weatherImg.alt = "Poeira/ Areia/ Cinzas";
            weatherText.textContent = "Poeira/ Areia/ Cinzas";
            break;

          default:
            weatherImg.src = ``;
            weatherImg.alt = `${json.weather[0].main}`;
            weatherText.textContent = `${json.weather[0].main}`;
            break;
        }

        //Temperatura e Clima
        tempMax.innerHTML =
          "Max: " +
          parseInt(json.main.temp_max) +
          '<span class="infoMasterMaxDet">ºC</span>';
        tempMin.innerHTML =
          "Min: " +
          parseInt(json.main.temp_min) +
          '<span class="infoMasterMinDet">ºC</span>';
        temp.innerHTML =
          parseInt(json.main.temp) + '<span class="infoMasterDet">ºC</span>';

        //Umidade
        humidity.innerHTML =
          json.main.humidity + '<span class="infoDet">%</span>';
        humidityImg.src = "./src/img/Umidade.png";
        humidityImg.alt = "Umidade";

        //Vento
        windSpeed.innerHTML =
          parseInt(json.wind.speed) + '<span class="infoDet">Km/h</span>';
        windSpeedImg.src = "./src/img/Vento.png";
        windSpeedImg.alt = "Velocidade do Vento";

        //Parentesco
        //MAIN
        weatherContainer.appendChild(weatherContainerInfo);
        search.appendChild(weatherContainer);
        search.appendChild(weatherDetailsContainer);

        //Temperatura e Clima
        temperatures.appendChild(tempMin);
        temperatures.appendChild(temp);
        temperatures.appendChild(tempMax);
        weatherContainerInfo.appendChild(weatherImg);
        weatherContainerInfo.appendChild(temperatures);
        weatherContainer.appendChild(weatherText);

        //Umidade
        humidityContainer.appendChild(humidityImg);
        humidityContainer.innerHTML += "Umidade:";
        humidityContainer.appendChild(humidity);
        weatherDetailsContainer.appendChild(humidityContainer);

        //Vento
        windSpeedContainer.appendChild(windSpeedImg);
        windSpeedContainer.innerHTML += "Veloc. Vento:";
        windSpeedContainer.appendChild(windSpeed);
        weatherDetailsContainer.appendChild(windSpeedContainer);
      }
    });
});

function clearLastQuery() {
  while (search.childNodes.length > 3) {
    let lastSearchChild = search.lastElementChild;
    search.removeChild(lastSearchChild);
  }
}
