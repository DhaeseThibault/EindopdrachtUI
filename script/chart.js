let daySelect, graph, canvas, loaderContainer, loaderDelay, loader;
const apiKey = "elQ8cNca9AWnuQLHJQTrKNJfku0KvV88CknTTazw";


// let showResult = queryResponse => {
//     console.log({queryResponse});

//     // dit vraagt de laatste sol op en steekt het in een variabele
//     const amount_sols = queryResponse.sol_keys.length;
//     const place_sols = amount_sols - 1;
//     const latest_sol = queryResponse.sol_keys[place_sols];
    
//     const season = queryResponse[latest_sol].Season.charAt(0).toUpperCase() + (queryResponse[latest_sol].Season).slice(1);


//     //weergave datum
//     const dateSol = queryResponse[latest_sol].First_UTC
//     const full_date = dateSol.slice(0, 10);
//     var year = full_date.substring(0,4);
//     var month = full_date.substring(5, 7);
//     var day = full_date.substring(8,10);    
//     const def_day = day + "/" + month + "/" + year;

//     // We gaan eerst een paar onderdelen opvullen
//     // Zorg dat de SOL wordt weergegeven
//     document.querySelector(".js-SOLnow").innerHTML = `SOL ${queryResponse.sol_keys[place_sols]}`;
//     document.querySelector(".js-Date").innerHTML = `${def_day}`
//     document.querySelector(".js-SOLnowGemTemp").innerHTML = `Gem: ${(queryResponse[latest_sol].AT.av).toFixed(1)}°F`;
//     document.querySelector(".js-SOLnowMinTemp").innerHTML = `Min: ${(queryResponse[latest_sol].AT.mn).toFixed(1)}°F`;
//     document.querySelector(".js-SOLnowMaxTemp").innerHTML = `Max: ${(queryResponse[latest_sol].AT.mx).toFixed(1)}°F`;
//     document.querySelector(".js-SeasonNow").innerHTML = `${season}`

// };


const hideLoader = function () {
	clearTimeout(loaderDelay);

	loaderContainer.style.display = 'none';
	canvas.style.display = 'block';
	loader.style.opacity = 0;
};

const showLoader = function () {
	loaderContainer.style.display = 'flex';
	canvas.style.display = 'none';

	loaderDelay = setTimeout(() => {
		loader.style.opacity = 1;
	}, 1000);
};

const drawChart = (data) => {
	let ctx = graph.getContext('2d');

	// let chart = new Chart(ctx, {
	new Chart(ctx, {
		type: 'line',
		data: {
			labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
			datasets: [
				{
					label: 'Visitors',
					data: data,
					borderColor: '#A3A0FB',
					backgroundColor: '#A3A0FB10',
					pointBackgroundColor: 'white',
					lineTension: 0.3,
					borderWidth: 2,
					pointRadius: 4,
				},
			],
		},
		options: {
			defaultFontColor: (Chart.defaults.global.defaultFontColor = '#808495'),
			scales: {
				yAxes: [
					{
						ticks: {
							min: 0,
							max: 50,
						},
					},
				],
			},
			tooltips: {
				xPadding: 10,
				yPadding: 10,
				cornerRadius: 0,
			},
			legend: {
				position: 'bottom',
				align: 'start',
				labels: {
					defaultFontFamily: (Chart.defaults.global.defaultFontFamily = "'Source Sans Pro', 'Helvetica', 'arial', 'sans-serif'"),
					boxWidth: 2,
				},
			},
			responsive: true,
		},
	});
	// document.querySelector('.js-chartjsLegend').innerHTML = chart.generateLegend();
};

const getData = (json) => {
	let data = [];

	json.map((day) => {
		data.push(day.aantalBezoekers);
	});

	drawChart(data);
	hideLoader();
};

const getVisitorsByDay = (day) => {
	// Enable loader
	showLoader();

	const endpoint = `https://iotcloud-mct.azurewebsites.net/api/visitors/${day}`;

	fetch(endpoint)
		.then((r) => r.json())
		.then((json) => {
			getData(json);
		})
		.catch((e) => console.error(e));
};

const init = () => {
	daySelect = document.querySelector('.js-day-select');
	graph = document.querySelector('.js-graph');

	daySelect.addEventListener('change', function (e) {
		getVisitorsByDay(e.target.value);
	});

	canvas = document.querySelector('.js-graph');
	loaderContainer = document.querySelector('.js-load-container');
	loader = document.querySelector('.js-loader');

	getVisitorsByDay('maandag');
};

document.addEventListener('DOMContentLoaded', function () {
	init();
	console.log("Dom loaded2");
});
