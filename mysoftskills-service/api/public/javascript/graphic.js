$(window).load(function () {
	var arrayWords=["alex","bill","carlos"];
	var arrayNumbers=[20,23,35]
    linearGraph(arrayWords,arrayNumbers);

  
	var arrayY1=[20,23,37,45,55,65,74,78];
	var arrayY2=[21,24,35,43,45,67,89,99];
    pieGraph(arrayY1,arrayY2);
});

//Lineal Graph
function linearGraph(arrayWords,arrayNumbers){
	var arrayData=[];
	for(var i=0;i<arrayWords.length;i++){
		arrayData.push({
			country: arrayWords[i],
	    	litres: arrayNumbers[i]
		});
	}
	var chart = AmCharts.makeChart( "chartdiv", {
	  "type": "pie",
	  "theme": "light",
	  "dataProvider":arrayData,
	  "valueField": "litres",
	  "titleField": "country",
	   "balloon":{
	   "fixedPosition":true
	  },
	  "export": {
	    "enabled": true
	  }
	});
}

//Pie Graph
function pieGraph(arrayY1,arrayY2){

	var arrayData=[];
	for(var i=0;i<arrayY1.length;i++){
		arrayData.push({
			"date": i,
			ay: arrayY1[i],
	    	by: arrayY2[i],
	    	aValue:1,
	    	bValue:1
		});
	}

	var chart = AmCharts.makeChart("chartdiv2", {
  "type": "xy",
  "theme": "light",
  "marginRight": 80,
  "dataDateFormat": "YYYY-MM-DD",
  "startDuration": 1.5,
  "trendLines": [],
  "balloon": {
    "adjustBorderColor": false,
    "shadowAlpha": 0,
    "fixedPosition": true
  },
  "graphs": [{
    "balloonText": "<div style='margin:5px;'><b>[[x]]</b><br>y:<b>[[y]]</b><br>value:<b>[[value]]</b></div>",
    "bullet": "diamond",
    "maxBulletSize": 25,
    "lineAlpha": 0.8,
    "lineThickness": 2,
    "lineColor": "#b0de09",
    "fillAlphas": 0,
    "xField": "date",
    "yField": "ay",
    "valueField": "aValue"
  }, {
    "balloonText": "<div style='margin:5px;'><b>[[x]]</b><br>y:<b>[[y]]</b><br>value:<b>[[value]]</b></div>",
    "bullet": "round",
    "maxBulletSize": 25,
    "lineAlpha": 0.8,
    "lineThickness": 2,
    "lineColor": "#fcd202",
    "fillAlphas": 0,
    "xField": "date",
    "yField": "by",
    "valueField": "bValue"
  }],
  "valueAxes": [{
    "id": "ValueAxis-1",
    "axisAlpha": 0
  }, {
    "id": "ValueAxis-2",
    "axisAlpha": 0,
    "position": "bottom"
  }],
  "allLabels": [],
  "titles": [],
  "dataProvider": arrayData,

  "export": {
    "enabled": true
  },

  "chartScrollbar": {
    "offset": 15,
    "scrollbarHeight": 5
  },

  "chartCursor": {
    "pan": true,
    "cursorAlpha": 0,
    "valueLineAlpha": 0
  }
});
}
