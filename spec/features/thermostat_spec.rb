feature 'viewing the temperature' do
  it 'is 20 by default' do
    visit('/')
    expect(page.find('#temperature')).to have_content '20'
  end

  # it 'can be increased' do
  #   visit('/')
  #   page.find('#temperature-up').click
  #   expect(page).to have_content '21'
  #   expect(page).not_to have_content '20'
  # end
end
