'use strict';

describe('Thermostat', function() {
  var thermostat

  beforeEach(function() {
    thermostat = new Thermostat();
  })

  describe('#getCurrentTemperature', function() {
    it('is 20 degrees by default', function() {
      expect(thermostat.getCurrentTemperature()).toEqual(20);
    });
  });
});
