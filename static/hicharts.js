
async function requestData() {
    const result = await fetch('/live-data');
    if (result.ok) {
      const data = await result.json();
      const [date, value] = [data[0][0], data[0][1]];
      const [date2, value2] = [data[1][0], data[1][1]];
      const point = [new Date(date).getTime(), value];
      const point2 = [new Date(date2).getTime(), value2];
      const series = chart.series[0],
            shift = series.data.length > 20;
      const series2 = chart.series[1],
            shift2 = series2.data.length > 20;
     
      chart.series[0].addPoint(point, true, shift);
      chart.series[1].addPoint(point2, false, shift2);
      setTimeout(requestData, 1000);
    
    }

    
  }
 let chart;
 let Height = 350; 
//  not use UTC
Highcharts.setOptions({
  time: {
    useUTC: false
  }
});

 window.addEventListener('load', function () {
  chart = new Highcharts.Chart({
    chart: {
      renderTo: 'container',
      defaultSeriesType: 'spline',
      events: {
        load: requestData
      },
      height: Height
    },
    title: {
      text: 'Live random data',
      margin: 40,
    },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 150,
      maxZoom: 20 * 1000
    },
    yAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,
      title: {
        text: 'Value',
        margin: 50
      }
    },
    series: [{
      name: 'Random data1',
      data: []
    },{
      name: 'Random data2',
      data: []
    }]
  });
});

  
async function writedashboard(){
  const result = await fetch('/live-data');
  if (result.ok) {
    const score = await result.json();
    let random1 = score[0][1];
    let random2 = score[1][1];

    document.getElementById('score1').innerText=random1;
    document.getElementById('score2').innerText=random2;;

   
    setTimeout(writedashboard, 1000);
  }
}

writedashboard();
  
