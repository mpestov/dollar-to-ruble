# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'GET /api/web/v1/forced_currency_rates' do
  context 'when request first element' do
    before do
      create_list :forced_currency_rate, 2
      get api_web_v1_forced_currency_rate_path :first
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end

    it 'returns first element' do
      expect(json_api_data).to include_json(
        json_api_attributes(
          'rate' => ForcedCurrencyRate.first.rate.to_s,
          'expires' => ForcedCurrencyRate.first.expires.in_time_zone.as_json
        )
      )
    end
  end

  context 'when request last element' do
    before do
      create_list :forced_currency_rate, 2
      get api_web_v1_forced_currency_rate_path :last
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end

    it 'returns last element' do
      expect(json_api_data).to include_json(
        json_api_attributes(
          'rate' => ForcedCurrencyRate.last.rate.to_s,
          'expires' => ForcedCurrencyRate.last.expires.in_time_zone.as_json
        )
      )
    end
  end

  context 'when request element with random id' do
    let(:id) { create_list(:forced_currency_rate, 4)[2].id }

    before do
      get api_web_v1_forced_currency_rate_path id
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end

    it 'returns last element' do
      expect(json_api_data).to include_json(
        json_api_attributes(
          'rate' => ForcedCurrencyRate.find(id).rate.to_s,
          'expires' => ForcedCurrencyRate.find(id).expires.in_time_zone.as_json
        )
      )
    end
  end
end
