Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  root 'pages#home'
  get '/quem-somos', to: 'pages#about', as: 'about'
  get '/software-para-hoteis-e-pousadas', to: 'pages#pms', as: 'pms'
  get '/materiais-educativos', to: 'pages#libraries', as: 'libraries'
  get '/cursos-para-hotelaria', to: 'pages#courses', as: 'courses'
  get '/teste-gratis', to: 'pages#test', as: 'test'
  get '/sucesso', to: 'pages#success', as: 'success'
  get '/channel-manager', to: 'pages#channels', as: 'channels'
  get '/motor-de-reservas', to: 'pages#engine', as: 'engine'
  get '/termos-de-servico', to: 'pages#terms', as: 'terms'
  get '/politica-de-privacidade', to: 'pages#privacy', as: 'privacy'
  get '/cookies', to: 'pages#cookies', as: 'cookies'
  get '/hoteleiros-em-acao', to: 'pages#covid', as: 'covid'
  post 'cadastrar-noticias', to: 'pages#sign_up_newsletters', as: 'sign_up_newsletters'
  get '/hotelflix', to: 'pages#hotelflix', as: 'hotelflix'
  get '/kit-marketing-hoteleiro', to: 'pages#kit', as: 'kit'
  # get '/paghotel', to: 'pages#paghotel', as: 'paghotel'
  get '/paghotel', to: redirect('/')
end
