var socket = io.connect('http://localhost:3000', {
    reconnection: false
});

const bandwidth_colors = {
    red: {
        fill: '#ff762e',
        stroke: '#ff0000',
    },
    darkBlue: {
        fill: '#92bed2',
        stroke: '#3282bf',
    }
};

var chart_bandwidth = new Chart(document.getElementById("chart_bandwidth"), {
    type: 'line',
    data: {
        datasets: [{
            label: 'in',
            backgroundColor: bandwidth_colors.darkBlue.fill,
            pointBackgroundColor: bandwidth_colors.darkBlue.stroke,
            borderColor: bandwidth_colors.darkBlue.stroke,
            pointHighlightStroke: bandwidth_colors.darkBlue.stroke,
            data: []
        }, {
            label: 'out',
            backgroundColor: bandwidth_colors.red.fill,
            pointBackgroundColor: bandwidth_colors.red.stroke,
            borderColor: bandwidth_colors.red.stroke,
            pointHighlightStroke: bandwidth_colors.red.stroke,
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
socket.on('bandwidth', function (data) {
    bandwidth_add_data(chart_bandwidth, '', data);
    if (i > 50) {
        bandwidth_pop_data(chart_bandwidth);
    } else i++;
});

function bandwidth_add_data(chart, label, data) {
    var bandwidth = data.toString().split(';');
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(bandwidth[0]);
    chart.data.datasets[1].data.push(-bandwidth[1]);
    chart.update();
}

function bandwidth_pop_data(chart) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
    chart.data.datasets[1].data.shift();
}