const apiKey = 'bd5e378503939ddaee76f12ad7a97608'; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById('city-input').value.trim();
  const weatherCard = document.getElementById('weather-result');
  const errorMessage = document.getElementById('error-message');

  weatherCard.classList.add('hidden');
  errorMessage.classList.add('hidden');

  if (!city) {
    errorMessage.textContent = 'Please enter a city name.';
    errorMessage.classList.remove('hidden');
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();

    document.getElementById('city-name').textContent = data.name;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('temp').textContent = data.main.temp;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind').textContent = data.wind.speed;

    weatherCard.classList.remove('hidden');
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove('hidden');
  }
}

// Weather Tips
const tips = [
  "Carry an umbrella during rainy seasons.",
  "Stay hydrated in hot weather.",
  "Wear layers to keep warm in cold weather.",
  "Check the weather forecast before outdoor activities.",
  "Apply sunscreen even on cloudy days.",
  "Drive carefully during fog or heavy rain.",
  "Secure loose items outdoors before a storm."
];

function loadTips() {
  const tipsList = document.getElementById('weather-tips');
  tipsList.innerHTML = '';
  tips.forEach(tip => {
    const li = document.createElement('li');
    li.textContent = tip;
    tipsList.appendChild(li);
  });
}

// Fun Weather Facts
const facts = [
  "The highest temperature ever recorded on Earth was 56.7°C (134°F) in Death Valley, USA.",
  "Raindrops can fall at speeds of about 22 miles per hour.",
  "Lightning strikes the Earth about 8.6 million times a day.",
  "Snowflakes can take up to an hour to reach the ground.",
  "The coldest temperature ever recorded was -89.2°C (-128.6°F) in Antarctica.",
  "A hurricane can release the energy of 10,000 nuclear bombs.",
  "The wettest place on Earth is Mawsynram, India."
];

function showRandomFact() {
  const factElem = document.getElementById('weather-fact');
  const randomIndex = Math.floor(Math.random() * facts.length);
  factElem.textContent = facts[randomIndex];
}

window.onload = () => {
  document.getElementById('get-weather-btn').addEventListener('click', getWeather);
  document.getElementById('city-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') getWeather();
  });
  document.getElementById('new-fact-btn').addEventListener('click', showRandomFact);

  loadTips();
  showRandomFact();
};