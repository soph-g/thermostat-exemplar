'use strict';

$(document).ready(function() {
  var thermostat = new Thermostat();

  updateTemperature();

  $('#temperature-up').on('click', function(data) {
    var currentTemperature = parseInt($('#temperature').text())
    thermostat.up(currentTemperature, updateTemperature);
  });

  $('#temperature-down').on('click', function() {
    var currentTemperature = parseInt($('#temperature').text())
    thermostat.down(currentTemperature, updateTemperature);
  });

  $('#temperature-reset').on('click', function() {
    thermostat.resetTemperature(updateTemperature);
  });

  $('#power-saving-on').on('click', function() {
    var currentTemperature = parseInt($('#temperature').text())
    thermostat.switchPowerSavingModeOn(currentTemperature, updateTemperature);
    $('#power-saving-status').text('on');
  });

  $('#power-saving-off').on('click', function() {
    thermostat.switchPowerSavingModeOff();
    $('#power-saving-status').text('off');
  })

  function updateTemperature() {
    thermostat.getCurrentTemperature(function(data) {
      $('#temperature').text(data.temperature);
      $('#temperature').attr('class', thermostat.energyUsage(data.temperature));
    });
  }
});
