# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :web do
      namespace :v1 do
        mount ActionCable.server => '/ws'
        resources :forced_currency_rates, only: %w[create show]
      end
    end
  end
end
