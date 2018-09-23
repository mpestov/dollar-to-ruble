# frozen_string_literal: true

class GetCurrencyRateInteractor < ApplicationInteractor
  def call
    params = {
      currency: context.currency
    }
    forced_currency_rate = GetForcedCurrencyRateInteractor.call params
    if forced_currency_rate.success?
      context.value = forced_currency_rate.value
      context.timestamp = forced_currency_rate.timestamp.to_i
    else
      currency_rate_from_forex = GetCurrencyRateFromForexInteractor.call params
      if currency_rate_from_forex.success?
        context.value = currency_rate_from_forex.value.to_s
        context.timestamp = currency_rate_from_forex.timestamp
      else
        context.fail!
      end
    end
  end
end
