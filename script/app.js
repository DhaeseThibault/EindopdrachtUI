const apiKey = "elQ8cNca9AWnuQLHJQTrKNJfku0KvV88CknTTazw"



let showResult = queryResponse => {
    console.log({queryResponse});

    // dit vraagt de laatste sol op en steekt het in een variabele
    const amount_sols = queryResponse.sol_keys.length;
    const place_sols = amount_sols - 1;
    const latest_sol = queryResponse.sol_keys[place_sols];
    
    const season = queryResponse[latest_sol].Season.charAt(0).toUpperCase() + (queryResponse[latest_sol].Season).slice(1);


    //weergave datum
    const dateSol = queryResponse[latest_sol].First_UTC
    const full_date = dateSol.slice(0, 10);
    var year = full_date.substring(0,4);
    var month = full_date.substring(5, 7);
    var day = full_date.substring(8,10);    
    const def_day = day + "/" + month + "/" + year;

    // We gaan eerst een paar onderdelen opvullen
    // Zorg dat de SOL wordt weergegeven
    document.querySelector(".js-SOLnow").innerHTML = `SOL ${queryResponse.sol_keys[place_sols]}`;
    document.querySelector(".js-Date").innerHTML = `${def_day}`
    document.querySelector(".js-SOLnowGemTemp").innerHTML = `Gem: ${(queryResponse[latest_sol].AT.av).toFixed(1)}°F`;
    document.querySelector(".js-SOLnowMinTemp").innerHTML = `Min: ${(queryResponse[latest_sol].AT.mn).toFixed(1)}°F`;
    document.querySelector(".js-SOLnowMaxTemp").innerHTML = `Max: ${(queryResponse[latest_sol].AT.mx).toFixed(1)}°F`;
    document.querySelector(".js-SeasonNow").innerHTML = `${season}`

};
// 2 Aan de hand van de url gaan we de API ophalen
const getApi = async () => {
    // Eerst bouwen we onze url op
    let url = `https://api.nasa.gov/insight_weather/?api_key=${apiKey}&feedtype=json&ver=1.0&sol_id=684`;

    // Met de fetch API proberen we de data op te halen
    const data = await fetch(url)
    .then((res) => res.json())
    .catch(err => console.error(err));

    // console.log(data)
    showResult(data);
};


const chart = document.getElementById("myChart");
console.log(chart);

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM Loaded")
    getApi();
})