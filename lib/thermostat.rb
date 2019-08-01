class Thermostat
  attr_reader :temperature

  def initialize
    @temperature = 20
  end

  def up
    @temperature += 1
  end

  def self.instance
    @thermostat ||= self.new
  end

end
