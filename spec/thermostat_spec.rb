require 'thermostat'

describe Thermostat do
  describe ".instance" do
    context "there is no instance of Thermostat" do
      it "returns a new instance of Thermostat" do
        expect(Thermostat.instance).to be_a Thermostat
      end
    end

    context "there is an instance of Thermostat" do
      it "returns the previously created instance" do
        instance = Thermostat.instance
        expect(Thermostat.instance).to equal instance
      end
    end
  end

  describe "#temperature" do
    it "has a default temperature of 20" do
      expect(subject.temperature).to eq Thermostat::DEFAULT_TEMPERATURE
    end
  end

  describe "#up" do
    it "increases the temperature" do
      subject.up
      expect(subject.temperature).to eq 21
    end
  end

  describe "#down" do
    it "decreases the temperature" do
      subject.down
      expect(subject.temperature).to eq 19
    end
  end

  describe "#reset" do
    it "resets the temperature to 20" do
      subject.down
      subject.down
      subject.reset
      expect(subject.temperature).to eq Thermostat::DEFAULT_TEMPERATURE
    end
  end
end
