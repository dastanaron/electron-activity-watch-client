'use strict';
exports.__esModule = true;
var electron_1 = require('electron');
var path = require('path');
var Wrapper_1 = require('./ActivityWatch/API/Wrapper');
var mainWindow;
var windowURL =
    process.env.NODE_ENV === 'development' ? 'http://localhost:9080' : 'file://' + __dirname + '/index.html';
function createWindow() {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        width: 390,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    // and load the index.html of the app.
    mainWindow.loadURL(windowURL);
    if (process.env.NODE_ENV === 'development') {
        // Open the DevTools. Do not open it if env is test, it's for avoid occur problem when spectron testing.
        mainWindow.webContents.openDevTools({ mode: 'bottom' });
    }
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
    Wrapper_1['default'].getBucketsAPI().createBucket();
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on('ready', createWindow);
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
