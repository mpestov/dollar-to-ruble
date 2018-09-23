# frozen_string_literal: true

FactoryBot.define do
  factory :forced_currency_rate do
    currency { CURRENCIES[:usdrub] }
    expires { Faker::Time.forward 2 }
    rate { Faker::Number.decimal 2, 4 }
  end
end
