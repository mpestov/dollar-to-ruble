# frozen_string_literal: true

class GetForcedCurrencyRateInteractor < ApplicationInteractor
  def call
    currency_rate = ForcedCurrencyRate.where(currency: context.currency).last
    context.fail! unless currency_rate
    context.fail! unless currency_rate.expires.future?
    context.value = currency_rate.rate
    context.timestamp = currency_rate.created_at
  end
end
