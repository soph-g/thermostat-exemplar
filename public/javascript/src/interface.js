'use strict';

$(document).ready(function() {
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
    $.post('/temperature', { method: "down" }, function(res) {
      var data = JSON.parse(res);
      if (data.status == 200) {
        updateTemperature();
      }
    });
  });

  $('#temperature-reset').on('click', function() {
    $.post('/temperature', { method: "reset" }, function(res) {
      var data = JSON.parse(res);
      if (data.status == 200) {
        updateTemperature();
      }
    });
  });

  $('#power-saving-on').on('click', function() {
    $.post('/power-saving-mode', { method: 'on' }, function(res) {
      var data = JSON.parse(res)
      if (data.status === 200) {
        updateTemperature();
      }
    });
  });

  $('#power-saving-off').on('click', function() {
    $.post('/power-saving-mode', function(res) {
      var data = JSON.parse(res)
      if (data.status === 200) {
        updateTemperature();
      }
    });
  })

  function updateTemperature() {
    $.get('/temperature', function(res) {
      var data = JSON.parse(res)
      if (data.status == 200) {
        var power_save_mode = data.power_save_mode_on ? 'on' : 'off';
        $('#temperature').text(data.temperature);
        $('#temperature').attr('class', data.energy_usage + '-usage');
        $('#power-saving-status').text(power_save_mode);
      }
    });
  }
});
