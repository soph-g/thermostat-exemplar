'use strict';

function Thermostat() {
  this._MINIMUM_TEMPERATURE = 10;
  this._temperature = 20;
  this._powerSavingMode = true;
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
  isPowerSavingModeOn: function() {
    return this._powerSavingMode;
  },
  switchPowerSavingModeOff: function() {
    this._powerSavingMode = false;
  },
  switchPowerSavingModeOn: function() {
    this._powerSavingMode = true;
  },
  _isMinimumTemperature: function() {
    return this._temperature == this._MINIMUM_TEMPERATURE;
  }
};
