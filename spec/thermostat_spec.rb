require 'thermostat'

describe Thermostat do
  describe "#temperature" do
    it "has a default temperature of 20" do
      expect(subject.temperature).to eq 20
    end
  end
end
