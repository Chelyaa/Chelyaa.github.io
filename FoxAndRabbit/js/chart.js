var foxCh = [];
var rabCh = [];
var chart = new CanvasJS.Chart("canvas", {
	title :{
		text: "Foxes and Rabbits"
	},
	axisY: {
		includeZero: false
	},  
	toolTip: {
		shared: true
	}, 
	legend: {
		cursor: "pointer",
		verticalAlign: "top",
		horizontalAlign: "center",
		dockInsidePlotArea: true,
	},   
	data: [{
		type: "line",
		markerSize: 0,
		axisYType: "secondary",
		name: "Foxes",
		showInLegend: true,
		dataPoints: foxCh
	},
	{
		type: "line",
		markerSize: 0,
		axisYType: "secondary",
		name: "Rabbits",
		showInLegend: true,
		dataPoints: rabCh
	}]
});

// var xVal = 0;
// var yVal = 100; 
// var updateInterval = 1000;
// var dataLength = 20;

// var updateChart = function (count) {

// 	count = count || 1;

// 	for (var j = 0; j < count; j++) {
// 		yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
// 		dps.push({
// 			x: xVal,
// 			y: yVal
// 		});
// 		xVal++;
// 	}

// 	if (dps.length > dataLength) {
// 		dps.shift();
// 	}

// 	chart.render();
// };

// updateChart(dataLength);