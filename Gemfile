source 'https://rubygems.org'

gem 'rails', '3.2.13'
gem 'sqlite3'
gem 'pg'
gem 'simple_form'
gem 'cloudinary'
gem 'faker'

group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'
  gem 'uglifier', '>= 1.0.3'
end
gem 'jquery-rails'
gem 'omniauth-facebook'
gem 'devise'
gem 'figaro'
group :development do
  gem 'better_errors'
  gem 'binding_of_caller', :platforms=>[:mri_19, :rbx]
  gem 'quiet_assets'
end
group :development, :test do
  gem 'factory_girl_rails'
  gem 'rspec-rails'
  gem 'shoulda'
  gem 'debugger'
end

group :production do
  gem 'thin'
end
group :test do
  gem 'capybara'
  gem 'cucumber-rails', :require=>false
  gem 'database_cleaner'
  gem 'email_spec'
  gem 'launchy'
  gem 'selenium-webdriver'
end
