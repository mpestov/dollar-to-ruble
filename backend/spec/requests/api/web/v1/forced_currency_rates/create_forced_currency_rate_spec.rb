# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'POST /api/web/v1/forced_currency_rates' do
  let(:attributes) { attributes_for :forced_currency_rate }

  context 'when the request is valid' do
    before do
      post api_web_v1_forced_currency_rates_path, params: { 'data[attributes]': attributes }
    end

    it 'returns status code 201' do
      expect(response).to have_http_status(201)
    end

    it 'returns created forced currency rate' do
      expect(json_api_data).to include_json(
        json_api_attributes(
          rate: attributes[:rate],
          expires: attributes[:expires].in_time_zone.as_json
        )
      )
    end
  end

  context 'when the request without params' do
    before do
      post api_web_v1_forced_currency_rates_path
    end

    it 'returns status code 400' do
      expect(response).to have_http_status(400)
    end

    it 'returns errors' do
      expect(json_api_errors).to include_json(
        [
          {
            detail: 'param is missing or the value is empty: data',
            status: '400'
          }
        ]
      )
    end
  end

  context 'when the request without rate' do
    before do
      post api_web_v1_forced_currency_rates_path, params: { 'data[attributes]': attributes.except(:rate) }
    end

    it 'returns status code 422' do
      expect(response).to have_http_status(422)
    end

    it 'returns errors' do
      expect(json_api_errors).to include_json(
        [
          {
            source: {
              pointer: '/data/attributes/rate'
            },
            detail: ["can't be blank"],
            status: '422'
          }
        ]
      )
    end
  end

  context 'when the request without exprires' do
    before do
      post api_web_v1_forced_currency_rates_path, params: { 'data[attributes]': attributes.except(:expires) }
    end

    it 'returns status code 422' do
      expect(response).to have_http_status(422)
    end

    it 'returns errors' do
      expect(json_api_errors).to include_json(
        [
          {
            source: {
              pointer: '/data/attributes/expires'
            },
            detail: ["can't be blank"],
            status: '422'
          }
        ]
      )
    end
  end
end
