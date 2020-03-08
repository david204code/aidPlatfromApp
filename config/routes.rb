Rails.application.routes.draw do
  
  root 'pages#index'

  resources :sessions, only: [:create]
  # get 'sessions/create'
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"

  resources :registrations, only: [:create]
  
  get 'pages/index'
  get 'pages/home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
