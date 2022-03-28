const API_KEY_ID = "bb8dc79cad4f6cc843d4d070e61f6f0f";

async function fetchData(q) {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${API_KEY_ID}&units=metric`
    const response = await fetch(API_URL)
    return response.json();
}

export default fetchData;