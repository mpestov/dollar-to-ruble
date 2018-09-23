# frozen_string_literal: true

class ForcedCurrencyRate < ApplicationRecord
  enumerize :currency, in: CURRENCIES.values, default: CURRENCIES[:usdrub]
end
