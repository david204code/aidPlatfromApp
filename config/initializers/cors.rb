Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "http://localhost:3000"
    resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head],
  credentials: true
  end

  #need to so the same for the domain of my production app, e.g heroku, just change the origin
end 