const apiKey = "elQ8cNca9AWnuQLHJQTrKNJfku0KvV88CknTTazw"

let showResult = queryResponse => {
    console.log({queryResponse});

    // dit vraagt de laatste sol op en steekt het in een variabele
    const amount_sols = queryResponse.sol_keys.length;
    const place_sols = amount_sols - 3;
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

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM Loaded")
    getApi();
})

// const getChart = querySelector => {
// var dateSol = queryResponse[latest_sol].First_UTC;
// var full_date = dateSol.slice(0, 10);
// var year = full_date.substring(0,4);
// var month = full_date.substring(5, 7);
// var day = full_date.substring(8,10);    
// var def_day = day + "/" + month + "/" + year;

window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        // backgroundcolor: "blue",
        title:{
            text: "Overview Max/Min/Avg"
        },	
        axisY: {
            title: "Temperatures",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC"
        },	
        toolTip: {
            shared: true
        },
        legend: {
            cursor:"pointer",
            itemclick: toggleDataSeries
        },
        data: [{
            type: "column",
            name: "Average Temperature",
            legendText: "Average Temperature",
            showInLegend: true, 
            dataPoints:[
                { label: "Saudi", y: 266.21 },
                { label: "Venezuela", y: 302.25 },
                { label: "Iran", y: 157.20 },
                { label: "Iraq", y: 148.77 },
                { label: "Kuwait", y: 101.50 },
                { label: "UAE", y: 97.8 }
            ]
        },
        {
            type: "column",	
            name: "Maximum Temperature",
            legendText: "Maximum Temperature",
            axisYType: "secondary",
            showInLegend: true,
            dataPoints:[
                { label: `Saudi`, y: 10.46 },
                { label: "Venezuela", y: 2.27 },
                { label: "Iran", y: 3.99 },
                { label: "Iraq", y: 4.45 },
                { label: "Kuwait", y: 2.92 },
                { label: "UAE", y: 3.1 }
            ]
        },
        {
            type: "column",	
            name: "Minimum Temperature",
            legendText: "Minimum Temperature",
            axisYType: "third",
            showInLegend: true,
            dataPoints:[
                { label: "Saudi", y: 10.46 },
                { label: "Venezuela", y: 2.27 },
                { label: "Iran", y: 3.99 },
                { label: "Iraq", y: 4.45 },
                { label: "Kuwait", y: 2.92 },
                { label: "UAE", y: 3.1 }
            ]
        }]
    });
    chart.render();
    
    function toggleDataSeries(e) {
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }
}