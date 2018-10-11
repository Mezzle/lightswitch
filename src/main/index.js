'use strict';

import { app, Menu, Tray } from 'electron';
import luxafor from 'common/luxafor';
import * as Sentry from '@sentry/electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';

const isDevelopment = process.env.NODE_ENV !== 'production';

Sentry.init({
  dsn: 'https://50d8066f54574556afa1cf2efff73249@sentry.io/1289792'
});

let tray;

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

const modes = {
  off: {
    label: 'Off',
    icon: `${__static}/icons/switch.png`,
    click: () => luxafor.fadeTo('#000')
  },
  green: {
    label: 'Ok',
    icon: `${__static}/icons/checkmark.png`,
    click: () => luxafor.fadeTo('#0f0')
  },
  red: {
    label: 'Busy',
    icon: `${__static}/icons/cross.png`,
    click: () => luxafor.fadeTo('#f00')
  }
};

const ready = () => {
  autoUpdater.checkForUpdatesAndNotify();

  if (process.platform === 'darwin') {
    app.dock.hide();
  }

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
