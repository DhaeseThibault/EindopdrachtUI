const apiKey = "elQ8cNca9AWnuQLHJQTrKNJfku0KvV88CknTTazw"


let showResult = queryResponse => {
    console.log({queryResponse});
    const latest_sol = queryResponse.sol_keys[6];
    const getal = 123.52346;
    console.log(getal.toFixed(1));


    // We gaan eerst een paar onderdelen opvullen
    // Zorg dat de SOL wordt weergegeven
    document.querySelector(".js-SOLnow").innerHTML += `${queryResponse.sol_keys[6]}`;
    document.querySelector(".js-SOLnowGemTemp").innerHTML += `${(queryResponse[latest_sol].AT.av).toFixed(1)}°F`;
    document.querySelector(".js-SOLnowMinTemp").innerHTML += `${(queryResponse[latest_sol].AT.mn).toFixed(1)}°F`;
    document.querySelector(".js-SOLnowMaxTemp").innerHTML += `${(queryResponse[latest_sol].AT.mx).toFixed(1)}°F`;

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

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM Loaded")
    getApi();
})




// MICRO INTERACTION
// $('.arrow').on('click touch', function(e) {

//     e.preventDefault();

//     let arrow = $(this);

//     if(!arrow.hasClass('animate')) {
//         arrow.addClass('animate');
//         setTimeout(() => {
//             arrow.removeClass('animate');
//         }, 1600);
//     }

// });