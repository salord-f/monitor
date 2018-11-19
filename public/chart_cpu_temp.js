var socket = io.connect('http://localhost:3000', {
    reconnection: false
});

var chart_cpu_temp = new Chart(document.getElementById("chart_cpu_temp"), {
    type: 'line',
    data: {
        datasets: [{
            label: 'CPU Temperature',
            data: [],
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
socket.on('cpu_temp', function (data) {
    addData(chart_cpu_temp, '', data);
    if (i > 50) {
        popFirst(chart_cpu_temp);
    } else i++;
});

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(data);
    chart.update();
}

function popFirst(chart) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
}