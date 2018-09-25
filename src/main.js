const { app, BrowserWindow } = require("electron");
const luxafor = require("./utils/luxafor");

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  mainWindow.loadFile(`${__dirname}/index.html`);

  mainWindow.on("closed", function() {
    luxafor.off();

    mainWindow = null;
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", function() {
  luxafor.off();

  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  if (mainWindow === null) {
    createWindow();
  }
});
