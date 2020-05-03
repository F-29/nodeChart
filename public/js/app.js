fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

//region Gauge chart
const randomData = () => {
    return [
        25,
        50,
        75,
        100,
        125
    ];
};


function median(values) {
    console.log(typeof values);
    values.sort((a, b) => {
        return a - b;
    });

    let half = Math.floor(values.length / 2);

    if (values.length % 2)
        return values[half];
    else
        return (values[half - 1] + values[half]) / 2.0;
}

let storeData = [];

const data = randomData();

let value = 0;

const updateValue = () => {
    setInterval(() => {
        axios.get("http://localhost:3000/")
            .then(res => {
                window.myGauge.update();
                value = res.data.value;
                console.log(value);
            });
        let toMedian = [];
        config.data.datasets.forEach((dataset) => {
            console.log("toMedian: ", typeof toMedian);
            if (toMedian.length < 5) {
                toMedian.splice(toMedian.length, 0, value);
                console.log("toMedian: ", typeof toMedian);
                console.log(toMedian);
            } else {
                console.log("in else");
                dataset.value = median(toMedian);
                toMedian = [];
                dataset.data = randomData();
                storeData += [toMedian];
            }
        });
        window.myGauge.update();
    }, 101);
};
console.log("Value: ", value);
console.log("StoreData: ", storeData);


const config = {
    type: 'gauge',
    data: {
        datasets: [{
            data: data,
            value: value,
            backgroundColor: ['#00a8f1', '#4270B9', '#00b960', '#f1b101', '#f16d1f', '#f62741'],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Plasma and Laser Technology Research Center'
        },
        layout: {
            padding: {
                top: 30,
                bottom: 30
            }
        },
        needle: {
            // Needle circle radius as the percentage of the chart area width
            radiusPercentage: 2,
            // Needle width as the percentage of the chart area width
            widthPercentage: 3.2,
            // Needle length as the percentage of the interval between inner radius (0%) and outer radius (100%) of the arc
            lengthPercentage: 80,
            // The color of the needle
            color: 'rgb(80,80,80)',
        },
        valueLabel: {
            formatter: Math.round,
        },
        plugins: {
            datalabels: {
                display: true,
                formatter: function (value, context) {
                    return '< ' + Math.round(value);
                },
                color: function (context) {
                    return context.dataset.backgroundColor;
                },
                color: 'rgb(228,228,228)',
                backgroundColor: 'rgb(55,55,55)',
                borderWidth: 8,
                borderRadius: 9,
                font: {
                    weight: 'bold',
                    size: 18
                }
            }
        }
    }
};

window.onload = () => {
    let ctx = document.getElementById('chart').getContext('2d');
    window.myGauge = new Chart(ctx, config);
    console.log("random value: ", updateValue());
};
//endregion

document.getElementById('save').addEventListener('click', () => {

});

// document.getElementById('randomizeData').addEventListener('click', function () {
//     config.data.datasets.forEach(function (dataset) {
//         dataset.data = randomData();
//         dataset.value = updateValue(dataset.data);
//     });
//
//     window.myGauge.update();
// });