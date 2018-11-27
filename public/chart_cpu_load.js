const cpu_load_colors = {
    red: {
        fill: '#ff762e',
        stroke: '#ff0000',
    },
    darkBlue: {
        fill: '#92bed2',
        stroke: '#3282bf',
    }
};

var chart_cpu_load = new Chart(document.getElementById("chart_cpu_load"), {
    type: 'line',
    data: {
        datasets: [{
            label: 'system',
            backgroundColor: cpu_load_colors.darkBlue.fill,
            pointBackgroundColor: cpu_load_colors.darkBlue.stroke,
            borderColor: cpu_load_colors.darkBlue.stroke,
            pointHighlightStroke: cpu_load_colors.darkBlue.stroke,
            data: []
        }, {
            label: 'user',
            backgroundColor: cpu_load_colors.red.fill,
            pointBackgroundColor: cpu_load_colors.red.stroke,
            borderColor: cpu_load_colors.red.stroke,
            pointHighlightStroke: cpu_load_colors.red.stroke,
            data: []
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes:
                [{
                    ticks: {
                        min: 0,
                        max: 100,
                        stepSize: 10,
                        beginAtZero: true,
                    },
                    stacked: true
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
window.glob.on('cpu_load', function (data) {
    if (i > 500) {
        cpu_load_pop_first(chart_cpu_load);
    } else i++;
    cpu_load_add_data(chart_cpu_load, '', data);
});

function cpu_load_add_data(chart, label, data) {
    var cpu_load = data.toString().split(';');
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(parseFloat(cpu_load[0]));
    chart.data.datasets[1].data.push(parseFloat(cpu_load[0]) + parseFloat(cpu_load[1]));
    chart.update();
}

function cpu_load_pop_first(chart) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
    chart.data.datasets[1].data.shift();
}