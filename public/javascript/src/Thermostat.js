'use strict';

function Thermostat() {
  this._MINIMUM_TEMPERATURE = 10;
  this._MEDIUM_ENERGY_USAGE_LIMIT = 18;
  this._DEFAULT_TEMPERATURE = 20;
  this._MAX_LIMIT_PSM_ON = 25;
  this._MAX_LIMIT_PSM_OFF = 32;
  this._powerSavingMode = true;
}

Thermostat.prototype = {
  getCurrentTemperature: function(callback) {
    $.get('/temperature', function(res) {
      var data = JSON.parse(res)
      callback(data);
    });
  },
  up: function(currentTemperature, callback) {
    if (this._isMaximumTemperature(currentTemperature)) return;
    this._updateTemperature(currentTemperature + 1, callback);
  },
  down: function(currentTemperature, callback) {
    if (this._isMinimumTemperature(currentTemperature)) return;
    this._updateTemperature(currentTemperature - 1, callback);
  },
  switchPowerSavingModeOff: function() {
    this._powerSavingMode = false;
  },
  switchPowerSavingModeOn: function(temperature, callback) {
    this._powerSavingMode = true;
    if (temperature > this._MAX_LIMIT_PSM_ON) {
      this._updateTemperature(this._MAX_LIMIT_PSM_ON, callback);
    }
  },
  resetTemperature: function(callback) {
    this._updateTemperature(this._DEFAULT_TEMPERATURE, callback);
  },
  energyUsage: function(temperature) {
    if (temperature < this._MEDIUM_ENERGY_USAGE_LIMIT) return 'low-usage';
    if (temperature < this._MAX_LIMIT_PSM_ON) return 'medium-usage';
    return 'high-usage';
  },
  _updateTemperature: function(value, callback){
    $.post('/temperature', { temperature: value }, callback)
  },
  _isMinimumTemperature: function(temperature) {
    return temperature == this._MINIMUM_TEMPERATURE;
  },
  _isMaximumTemperature: function(temperature) {
    if (this._powerSavingMode) {
      return temperature == this._MAX_LIMIT_PSM_ON;
    }
    return temperature == this._MAX_LIMIT_PSM_OFF
  }
};
