'use strict';

function Thermostat() {
  this._MINIMUM_TEMPERATURE = 10;
  this._MAX_LIMIT_PSM_ON = 25;
  this._MAX_LIMIT_PSM_OFF = 32;
  this._DEFAULT_TEMPERATURE = 20;
  this._TEMPERATURE_CHANGE = 1;
  this._temperature = this._DEFAULT_TEMPERATURE;
  this._powerSavingMode = true;
}

Thermostat.prototype = {
  getCurrentTemperature: function() {
    return this._temperature;
  },
  up: function() {
    if (this._isMaximumTemperature()) {
      return;
    }
    this._temperature += this._TEMPERATURE_CHANGE;
  },
  down: function() {
    if (this._isMinimumTemperature()) {
      return;
    }
    this._temperature -= this._TEMPERATURE_CHANGE;
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
  resetTemperature: function() {
    this._temperature = this._DEFAULT_TEMPERATURE;
  },
  _isMinimumTemperature: function() {
    return this._temperature == this._MINIMUM_TEMPERATURE;
  },
  _isMaximumTemperature: function() {
    if (this.isPowerSavingModeOn()) {
      return this._temperature == this._MAX_LIMIT_PSM_ON;
    }
    return this._temperature == this._MAX_LIMIT_PSM_OFF
  }
};
