var socket = io.connect('http://localhost:3000');

const colors = {
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
            backgroundColor: colors.darkBlue.fill,
            pointBackgroundColor: colors.darkBlue.stroke,
            borderColor: colors.darkBlue.stroke,
            pointHighlightStroke: colors.darkBlue.stroke,
            data: []
        }, {
            label: 'user',
            backgroundColor: colors.red.fill,
            pointBackgroundColor: colors.red.stroke,
            borderColor: colors.red.stroke,
            pointHighlightStroke: colors.red.stroke,
            data: []
        }]
    },
    options: {
        responsive: false,
        width: 1000,
        height: 600,
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
socket.on('cpu_load', function (data) {
    cpu_add_data(chart_cpu_load, '', data);
    if (i > 50) {
        cpu_pop_first(chart_cpu_load);
    } else i++;
});

function cpu_add_data(chart, label, data) {
    var cpu_load = data.toString().split(' ');
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(parseFloat(cpu_load[4].slice(0, -1)));
    chart.data.datasets[1].data.push(parseFloat(cpu_load[2].slice(0, -1)) + parseFloat(cpu_load[4].slice(0, -1)));
    chart.update();
}

function cpu_pop_first(chart) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
    chart.data.datasets[1].data.shift();
}