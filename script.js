async function fetchWeather() {
  const city = document.getElementById('city').value.trim();
  const apiKey = "18f9d9ee10225efeeb87228c03f5781a"; // Replace with your OpenWeatherMap API key

  if (city === "") {
    document.getElementById("result").innerHTML = `<div class="alert alert-warning">Please enter a city name.</div>`;
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      document.getElementById('result').innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>🌡 Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>🌤 Condition:</strong> ${data.weather[0].description}</p>
        <p><strong>💧 Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>🌬 Wind Speed:</strong> ${data.wind.speed} m/s</p>
      `;
    } else {
      document.getElementById('result').innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
    }
  } catch (error) {
    document.getElementById('result').innerHTML = `<div class="alert alert-danger">Something went wrong. Please try again later.</div>`;
    console.error(error);
  }
}
