const express = require('express');
const app = express();
const port = 3000;

const five = require("johnny-five");
const board = new five.Board();

let value = 0;
board.on("ready", () => {

    let sensor = new five.Sensor({
        pin: "A0",
        freq: 50
    });
    sensor.on('data', (newValue) => {
        value = parseInt((newValue / 920.5 * 135).toString());
        setInterval(() => {
            app.get('/', (req, res) => res.json({"value": value}));
        }, 50);
    });
});



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));