class Thermostat
  attr_reader :temperature

  DEFAULT_TEMPERATURE = 20

  def initialize
    @temperature = DEFAULT_TEMPERATURE
  end

  def up
    @temperature += 1
  end

  def down
    @temperature -= 1
  end

  def reset
    @temperature = DEFAULT_TEMPERATURE
  end

  def self.instance
    @thermostat ||= self.new
  end

end
