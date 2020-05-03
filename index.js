const {app, BrowserWindow} = require('electron');

let createWindow = () => {
    let win = new BrowserWindow({
        width: 1280,
        height: 900,
        webPreferences: {
            nodeIntegration: true
        },
        fullscreenable: true
    });
    win.setTitle("This is the title");
    win.center();
    win.loadFile('./public/index.html');
};

app.whenReady().then(createWindow);