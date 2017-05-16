google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7]
    ]);

    var options = {
        title: 'MY GRAPHS'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    var chart1 = new google.visualization.PieChart(document.getElementById('piechart2'));
    var chart2 = new google.visualization.PieChart(document.getElementById('piechart3'));

    chart.draw(data, options);
    chart1.draw(data, options);
    chart2.draw(data, options);
}

$('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left', // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
    }
);