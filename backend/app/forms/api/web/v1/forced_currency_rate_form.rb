# frozen_string_literal: true

class Api::Web::V1::ForcedCurrencyRateForm < ApplicationForm
  properties :rate, :expires

  validates :rate, presence: true
  validates :expires, presence: true
end
