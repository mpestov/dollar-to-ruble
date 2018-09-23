# frozen_string_literal: true

class CurrencyRateChannel < ApplicationCable::Channel
  periodically :transmit_rate, every: 1.seconds

  def transmit_rate
    context = {
      currency: CURRENCIES[:usdrub]
    }
    currency_rate = GetCurrencyRateInteractor.call context
    return unless currency_rate.success?
    transmit(
      value: currency_rate.value,
      timestamp: currency_rate.timestamp
    )
  end

  def subscribed
    stream_from 'currency_rate'
  end
end
