'use strict';

$(document).ready(function() {
  var thermostat = new Thermostat();

  updateTemperature();

  $('#temperature-up').on('click', function() {
    $.post('/temperature', { method: "up" }, function(res) {
      var data = JSON.parse(res);
      if (data.status == 200) {
        updateTemperature();
      }
    });
  });

  $('#temperature-down').on('click', function() {
    thermostat.down();
    updateTemperature();
  });

  $('#temperature-reset').on('click', function() {
    thermostat.resetTemperature();
    updateTemperature();
  });

  $('#power-saving-on').on('click', function() {
    thermostat.switchPowerSavingModeOn();
    $('#power-saving-status').text('on');
    updateTemperature();
  });

  $('#power-saving-off').on('click', function() {
    thermostat.switchPowerSavingModeOff();
    $('#power-saving-status').text('off');
    updateTemperature();
  })

  function updateTemperature() {
    $.get('/temperature', function(res) {
      var data = JSON.parse(res)
      if (data.status == 200) {
        $('#temperature').text(data.temperature);
      }
    });
    $('#temperature').attr('class', thermostat.energyUsage());
  }
});
