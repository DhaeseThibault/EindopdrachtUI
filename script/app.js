const apiKey = "elQ8cNca9AWnuQLHJQTrKNJfku0KvV88CknTTazw"


let showResult = queryResponse => {
    console.log({queryResponse});

    // We gaan eerst een paar onderdelen opvullen
    // Zorg dat de SOL wordt weergegeven
    document.querySelector(".js-sol1").innerHTML = `SOL: ${queryResponse.sol_keys[0]}<br> Temp: ${queryResponse[681].AT.av}`;
    document.querySelector(".js-sol2").innerHTML = `SOL: ${queryResponse.sol_keys[1]}<br> Temp: ${queryResponse[684].AT.av}`;
    document.querySelector(".js-sol3").innerHTML = `SOL: ${queryResponse.sol_keys[2]}<br> Temp: ${queryResponse[685].AT.av}`;

};


// 2 Aan de hand van de url gaan we de API ophalen
const getApi = async () => {
    // Eerst bouwen we onze url op
    let url = `https://api.nasa.gov/insight_weather/?api_key=${apiKey}&feedtype=json&ver=1.0&sol_id=684`

    // Met de fetch API proberen we de data op te halen
    const data = await fetch(url)
    .then((res) => res.json())
    .catch(err => console.error(err))

    // console.log(data)
    showResult(data)
};

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM Loaded")
    getApi();
})