d3.csv('static/data/trip_summary.csv').then((data) => {
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
