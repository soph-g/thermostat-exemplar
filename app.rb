require 'sinatra/base'
require 'json'
require_relative './lib/thermostat'

class ThermostatApp < Sinatra::Base

  enable :sessions

  get "/" do
    File.read('public/index.html')
  end

  get "/temperature" do
    thermostat = Thermostat.instance
    {
      temperature: thermostat.temperature,
      status: 200
    }.to_json
  end

  post "/temperature" do
    thermostat = Thermostat.instance
    case params[:method]
    when "up"
      thermostat.up
    when "down"
      thermostat.down
    when "reset"
      thermostat.reset
    end
    { status: 200 }.to_json
  end

  run! if app_file == $0
end
