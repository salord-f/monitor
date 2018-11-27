var chart_cpu_temp = new Chart(document.getElementById("chart_cpu_temp"), {
    type: 'line',
    data: {
        datasets: [{
            label: 'CPU Temperature',
            data: [],
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes:
                [{
                    ticks: {
                        min: 40,
                        max: 100,
                        stepSize: 10
                    }
                }],
        },

        // performance
        animation:
            {
                duration: 0, // general animation time
            },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var i = 0;
window.glob.on('cpu_temp', function (data) {
    if (i > 500) {
        cpu_temp_pop_first(chart_cpu_temp);
    } else i++;
    cpu_temp_add_data(chart_cpu_temp, '', data);

});

function cpu_temp_add_data(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(data);
    chart.update();
}

function cpu_temp_pop_first(chart) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
}