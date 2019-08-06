'use strict';

describe('Thermostat', function() {
  var thermostat;

  beforeEach(function() {
    jasmine.Ajax.install();
    thermostat = new Thermostat();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  describe('#getCurrentTemperature', function() {
    it('retrieves the temperature', function() {
      thermostat.getCurrentTemperature();
      expect(jasmine.Ajax.requests.mostRecent().url).toBe('/temperature');
    });
  });

  describe('#up', function() {
    it('sends an increased temperature', function() {
      thermostat.up(20);
      expect(jasmine.Ajax.requests.mostRecent().url).toBe('/temperature');
      expect(jasmine.Ajax.requests.mostRecent().params).toBe("temperature=21");
    });
    describe('power saving mode is on', function() {
      it('has an upper limit of 25 degrees', function() {
        var i;
        for (i = 20; i < 26; i++) {
          thermostat.up(i);
        }
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('/temperature');
        expect(jasmine.Ajax.requests.mostRecent().params).toBe("temperature=25");
      });
    });
    describe('power saving mode is off', function() {
      it('has an upper limit of 32 degrees', function() {
        thermostat.switchPowerSavingModeOff();
        var i;
        for (i = 20; i < 33; i++) {
          thermostat.up(i);
        }
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('/temperature');
        expect(jasmine.Ajax.requests.mostRecent().params).toBe("temperature=32");
      });
    });
  });

  describe('#down', function() {
    it('sends a decreased temperature', function() {
      thermostat.down(20);
      expect(jasmine.Ajax.requests.mostRecent().url).toBe('/temperature');
      expect(jasmine.Ajax.requests.mostRecent().params).toBe("temperature=19");
    });

    it('has a minimum temperature of 10 degrees', function() {
      var i;
      for (i = 20; i > 9; i--) {
        thermostat.down(i);
      }
      expect(jasmine.Ajax.requests.mostRecent().url).toBe('/temperature');
      expect(jasmine.Ajax.requests.mostRecent().params).toBe("temperature=10");
    });
  });


  describe('#switchPowerSavingModeOff', function() {
    it('switches power saving mode off', function() {
      thermostat.switchPowerSavingModeOff();
    });
  });

  describe('#switchPowerSavingModeOn', function() {
    it('switches power saving mode on preventing temperature increase above max', function() {
      thermostat.switchPowerSavingModeOff();
      thermostat.switchPowerSavingModeOn(25);
      thermostat.up(25)
      expect(jasmine.Ajax.requests.count()).toBe(0);
      thermostat.down(25)
      expect(jasmine.Ajax.requests.mostRecent().url).toBe('/temperature');
      expect(jasmine.Ajax.requests.mostRecent().params).toBe("temperature=24");
    });

    it('resets the temperature to the PSM On Max', function() {
      thermostat.switchPowerSavingModeOff();
      thermostat.switchPowerSavingModeOn(28);
      expect(jasmine.Ajax.requests.mostRecent().url).toBe('/temperature');
      expect(jasmine.Ajax.requests.mostRecent().params).toBe("temperature=25");
    })
  });

  describe('reset temperature', function() {
    it('resets the temperature to default', function() {
      thermostat.up();
      thermostat.up();
      thermostat.up();
      thermostat.resetTemperature();
      expect(jasmine.Ajax.requests.mostRecent().url).toBe('/temperature');
      expect(jasmine.Ajax.requests.mostRecent().params).toBe("temperature=20");
    });
  });

  describe('#energyUsage', function() {
    describe('when the temperature is below 18 degrees', function() {
      it('is considered low-usage', function() {
        expect(thermostat.energyUsage(17)).toEqual('low-usage')
      });
    });
    describe('when the temperature is below 25 degrees', function() {
      it('is considered medium-usage', function() {
        expect(thermostat.energyUsage(20)).toEqual('medium-usage')
      });
    });
    describe('when the temperature is above 25 degrees', function() {
      it('is considered high-usage', function() {
        expect(thermostat.energyUsage(26)).toEqual('high-usage')
      });
    });
  });
});
