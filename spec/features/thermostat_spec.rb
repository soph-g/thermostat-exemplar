feature 'thermostat app' do
  feature 'viewing the homepage' do
    it 'has some welcome text' do
      visit('/')
      expect(page).to have_content 'Hello, World'
    end
  end
end
