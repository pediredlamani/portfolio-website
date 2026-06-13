const apiKey = "54ea5d02884ae5f0e7583d70a6a290cf";

async function getWeather() {
    const city = document.getElementById("city").value;

    try {
        const response = await fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=metric"
        );

        const data = await response.json();

        if (data.cod != 200) {
            document.getElementById("result").innerHTML =
            "City not found!";
            return;
        }

        document.getElementById("result").innerHTML =
        `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;

    } catch (error) {

        document.getElementById("result").innerHTML =
        "Error fetching weather data";

    }
}
