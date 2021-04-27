d3.csv('./static/data/trip_summary.csv').then((data) => {
  console.log(data);
  var tableBodyElement = d3.select('#summary_table').select('tbody');
  tableBodyElement.html('');
  data.forEach((eachObj) => {
    var row = tableBodyElement.append('tr');
    Object.entries(eachObj).forEach(([key, value]) => {
      row.append('td').text(value);
    });
  });
});

d3.json('https://scooters.pythonanywhere.com/api/trips/summary').then(
  (data) => {
    console.log(data);

    // Pie chart
    var trace1 = {
      labels: data.data.map((row) => row.company),
      values: data.data.map((row) => row.time_min),
      type: 'pie',
    };

    var data1 = [trace1];
    var layout1 = {
      title: 'Scooter Usage',
    };

    Plotly.newPlot('pie', data1, layout1);

    // Bubble chart
    var trace2 = {
      type: 'bubble',
      x: data.data.map((row) => row.scooter_qty),
      y: data.data.map((row) => Math.round(row.time_min / 60, 2)),
      mode: 'markers',
      marker: {
        size: data.data.map((row) => row.distance_meter / 100000),
        // color: props.sample[0].sample_values.map(
        // (value) => `rgb(${value}, ${255 - value}, ${Math.random() * 255})`
        // ),
      },
      text: data.data.map((row) => row.company),
    };
    var data2 = [trace2];

    var layout2 = {
      title: `Scooters`,
      xaxis: { title: 'Scooter Quantity' },
      yaxis: { title: 'Scooter Usage (Hrs)' },
      showlegend: false,
      // height: 600,
      // width: 1200,
    };

    Plotly.newPlot('bubble', data2, layout2);
  }
);

d3.json('https://scooters.pythonanywhere.com/api/trips/trip-hours').then(
  (data) => {
    var trips = data.data.sort((a, b) => a.hour - b.hour);

    // line chart 1
    var trace1 = {
      x: trips.map((row) => row.hour),
      y: trips.map((row) => row.trip_count),
      type: 'line',
    };

    var data1 = [trace1];
    var layout1 = {
      title: 'Trip Counts - Time',
      xaxis: { title: 'DC Time' },
      yaxis: { title: 'Trip Counts' },
    };

    Plotly.newPlot('line1', data1, layout1);

    // Line chart 2
    var trace2 = {
      x: trips.map((row) => row.hour),
      y: trips.map((row) => row.trip_distance_mile),
      type: 'line',
    };

    var data2 = [trace2];
    var layout2 = {
      title: 'Trip Distance - Time',
      xaxis: { title: 'DC Time' },
      yaxis: { title: 'Trip Total Ditance (mile)' },
    };

    Plotly.newPlot('line2', data2, layout2);

    // Line chart 2
    var trace3 = {
      x: trips.map((row) => row.hour),
      y: trips.map((row) => row.trip_time_min),
      type: 'line',
    };

    var data3 = [trace3];
    var layout3 = {
      title: 'Trip Time - Time',
      xaxis: { title: 'DC Time' },
      yaxis: { title: 'Trip Total Time (hours)' },
    };

    Plotly.newPlot('line3', data2, layout3);
  }
);
