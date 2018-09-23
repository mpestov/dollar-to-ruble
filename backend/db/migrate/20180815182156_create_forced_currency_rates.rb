# frozen_string_literal: true

class CreateForcedCurrencyRates < ActiveRecord::Migration[5.2]
  def change
    create_table :forced_currency_rates do |t|
      t.string :currency
      t.datetime :expires
      t.decimal :rate, precision: 7, scale: 4

      t.timestamps
    end
  end
end
