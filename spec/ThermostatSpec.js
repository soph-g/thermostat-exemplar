'use strict';

describe('Thermostat', function() {
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  describe('#getCurrentTemperature', function() {
    it('is 20 degrees by default', function() {
      expect(thermostat.getCurrentTemperature()).toEqual(20);
    });
  });

  describe('#up', function() {
    it('increments the temperature', function() {
      thermostat.up();
      expect(thermostat.getCurrentTemperature()).toEqual(21);
    });
    describe('power saving mode is on', function() {
      it('has an upper limit of 25 degrees', function() {
        for (var i = 0; i < 8; i++) {
          thermostat.up();
        }
        expect(thermostat.getCurrentTemperature()).toEqual(25);
      });
    });
    describe('power saving mode is off', function() {
      it('has an upper limit of 25 degrees', function() {
        thermostat.switchPowerSavingModeOff();
        for (var i = 0; i < 15; i++) {
          thermostat.up();
        }
        expect(thermostat.getCurrentTemperature()).toEqual(32);
      });
    });
  });

  describe('#down', function() {
    it('decrements the temperature', function() {
      thermostat.down();
      expect(thermostat.getCurrentTemperature()).toEqual(19);
    });

    it('has a minimum temperature of 10 degrees', function() {
      for (var i = 0; i < 12; i++) {
        thermostat.down();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(10);
    });
  });

  describe('#isPowerSavingModeOn', function() {
    it('is on by default', function() {
      expect(thermostat.isPowerSavingModeOn()).toBe(true);
    });
  });

  describe('#switchPowerSavingModeOff', function() {
    it('switches power saving mode off', function() {
      thermostat.switchPowerSavingModeOff();
      expect(thermostat.isPowerSavingModeOn()).toBe(false);
    });
  });

  describe('#switchPowerSavingModeOn', function() {
    it('switches power saving mode on', function() {
      thermostat.switchPowerSavingModeOff();
      thermostat.switchPowerSavingModeOn();
      expect(thermostat.isPowerSavingModeOn()).toBe(true);
    });
  });

  describe('reset temperature', function() {
    it('resets the temperature to default', function() {
      thermostat.up();
      thermostat.up();
      thermostat.up();
      thermostat.resetTemperature();
      expect(thermostat.getCurrentTemperature()).toEqual(20);
    });
  });

  describe('#energyUsage', function() {
    describe('when the temperature is below 18 degrees', function() {
      it('is considered low-usage', function() {
        for (var i = 0; i < 3; i++) {
          thermostat.down();
        }
        expect(thermostat.energyUsage()).toEqual('low-usage')
      });
    });
    describe('when the temperature is below 25 degrees', function() {
      it('is considered medium-usage', function() {
        expect(thermostat.energyUsage()).toEqual('medium-usage')
      });
    });
    describe('when the temperature is above 25 degrees', function() {
      it('is considered high-usage', function() {
        for (var i = 0; i < 6; i++) {
          thermostat.up();
        }
        expect(thermostat.energyUsage()).toEqual('high-usage')
      });
    });
  });
});
