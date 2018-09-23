# frozen_string_literal: true

class GetCurrencyRateFromForexInteractor < ApplicationInteractor
  def call
    uri = URI 'https://quotes.fxclub.org/quotes.json'

    response = Net::HTTP.get uri
    response_json = JSON.parse response

    currency = response_json['list'][currency CURRENCIES[:usdrub]]

    context.value = currency['bid-fast']
    context.timestamp = currency['ts']
  end

  private

  def currency(code)
    {
      CURRENCIES[:usdrub] => 'USDRUB'
    }[code]
  end
end
