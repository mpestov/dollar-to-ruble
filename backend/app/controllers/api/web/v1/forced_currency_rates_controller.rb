# frozen_string_literal: true

class Api::Web::V1::ForcedCurrencyRatesController < ApplicationController
  def create
    form = Api::Web::V1::ForcedCurrencyRateForm.new ForcedCurrencyRate.new
    if !form.validate data_attributes
      render_422 form.model.errors.messages.merge form.errors.messages
    elsif form.save
      render json: Api::Web::V1::ForcedCurrencyRateSerializer.new(form.model).serializable_hash,
             status: :created
    else
      head :internal_server_error
    end
  end

  def show
    forced_currency_rate = if params[:id] == 'first'
                             ForcedCurrencyRate.first
                           elsif params[:id] == 'last'
                             ForcedCurrencyRate.last
                           else
                             ForcedCurrencyRate.find params[:id]
                           end
    render json: Api::Web::V1::ForcedCurrencyRateSerializer.new(forced_currency_rate).serializable_hash
  end
end
