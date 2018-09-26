const { app, Menu, Tray, BrowserWindow } = require('electron');
const luxafor = require('./utils/luxafor');

let tray;

const modes = {
  off: {
    label: 'Off',
    icon: `${__dirname}/icons/switch.png`,
    click: () => luxafor.fadeTo('#000')
  },
  green: {
    label: 'Ok',
    icon: `${__dirname}/icons/checkmark.png`,
    click: () => luxafor.fadeTo('#0f0')
  },
  red: {
    label: 'Busy',
    icon: `${__dirname}/icons/cross.png`,
    click: () => luxafor.fadeTo('#f00')
  }
};

const ready = () => {
  // if (process.platform === 'darwin') {
  //   app.dock.hide();
  // }

  tray = new Tray(modes.off.icon);
  const menuTemplate = [];

  for (let mode of Object.values(modes)) {
    menuTemplate.push({
      ...mode,
      click: () => {
        tray.setImage(mode.icon);
        mode.click();
      }
    });
  }

  const contextMenu = Menu.buildFromTemplate([
    ...menuTemplate,
    { role: 'quit' }
  ]);

  tray.setToolTip('Lightswitch');
  tray.setContextMenu(contextMenu);
};

app.on('ready', ready);

app.on('activate', () => {
  if (tray === null) {
    ready();
  }
});
