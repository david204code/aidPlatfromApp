if Rails.env == "production"
  Rails.application.config.session_store :cookie_store, key: "_aidplatformapp" 
  domain: "myheroku.com"
else
  Rails.application.config.session_store :cookie_store, key: "_aidplatformapp" 
end