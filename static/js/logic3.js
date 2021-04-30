d3.selectAll("button").on("click", function() {
    d3.select("#container").html = "";
    init(d3.select(this).attr("id"))
  



});


function init(year){
    d3.json('/api').then((data) => {
        var runnerm = [];
        var runnerf = [];
        console.log(data)
        data.forEach(element => {
            if (element["Offical Time"]){
                var time = [time_to_min(element["Offical Time"]), element.Age];
                if (element.Year == year && element.Gender == "M") {
                   runnerm.push(time);   
                }
                else if (element.Year == year && element.Gender == "F") {            
                    runnerf.push(time);   
                }
    
            }
    
            
    
        });
        console.log(runnerf);
        console.log(runnerm);
        function time_to_min(string) {
            let time_segments = string.split(':')
            let hours = parseInt(time_segments[0])
            let mins = parseInt(time_segments[1])
            let time = parseFloat(((hours * 60 + mins)/60).toFixed(2));
            return time
    
    
    
        }
    
        Highcharts.chart('container', {
            chart: {
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: 'Age versus Time (Decimal) for Boston Runners'
            },
            subtitle: {
                text: 'For ' + year
            },
            xAxis: {
                title: {
                    enabled: true,
                    text: 'Runner Time'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                title: {
                    text: 'Runner Age'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 100,
                y: 70,
                floating: true,
                backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
                borderWidth: 1
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '{point.x} Official Time, {point.y} Age'
                    }
                }
            },
            series: [{
                name: 'Female',
                color: 'rgba(223, 83, 83, .5)',
                data: runnerf
        
            }, {
                name: 'Male',
                color: 'rgba(119, 152, 191, .5)',
                data: runnerm
            }]
        });
        
            
    })


}
init("2015")


  



