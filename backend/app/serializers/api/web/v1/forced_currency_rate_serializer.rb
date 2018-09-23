# frozen_string_literal: true

class Api::Web::V1::ForcedCurrencyRateSerializer < ApplicationSerializer
  attributes :rate, :expires
end
