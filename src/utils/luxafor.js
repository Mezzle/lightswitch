const Luxafor = require("luxafor-api");
const leds = require("./leds");

const device = new Luxafor();
device.off();

module.exports = device;
