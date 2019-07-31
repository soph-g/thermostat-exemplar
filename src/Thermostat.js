'use strict';

function Thermostat() {
  this._MINIMUM_TEMPERATURE = 10;
  this._temperature = 20;
}

Thermostat.prototype = {
  getCurrentTemperature: function() {
    return this._temperature;
  },
  up: function() {
    this._temperature += 1;
  },
  down: function() {
    if (this._isMinimumTemperature()) {
      return;
    }
    this._temperature -= 1;
  },
  _isMinimumTemperature: function() {
    return this._temperature == this._MINIMUM_TEMPERATURE;
  }
};
