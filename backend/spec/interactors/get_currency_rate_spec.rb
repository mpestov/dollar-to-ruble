# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Get currency rate' do
  subject(:context) { GetCurrencyRateInteractor.call(currency: CURRENCIES[:usdrub]) }

  context 'when forced currency rate is set' do
    before do
      create_list :forced_currency_rate, 3
    end

    it 'success' do
      expect(context).to be_a_success
    end

    it 'returns forced currency rate value' do
      expect(context.value).to eq ForcedCurrencyRate.last.rate
    end

    it 'returns forced currency rate timestamp' do
      expect(context.timestamp).to eq ForcedCurrencyRate.last.created_at.to_i
    end
  end

  context 'when forced currency rate is not set and get rate from forex' do
    let(:forex_context) do
      OpenStruct.new(
        value: 71.6666,
        timestamp: Time.now,
        success?: true
      )
    end

    before do
      allow(GetCurrencyRateFromForexInteractor).to receive(:call)
        .with(currency: CURRENCIES[:usdrub])
        .and_return(forex_context)
    end

    it 'success' do
      expect(context).to be_a_success
    end

    it 'returns currency rate value from forex' do
      expect(context.value).to eq forex_context.value.to_s
    end

    it 'returns currency rate timestamp from forex' do
      expect(context.timestamp).to eq forex_context.timestamp
    end
  end

  context 'when attempt to get currency rate from forex is fail' do
    let(:forex_context) do
      OpenStruct.new(
        value: 71.6666,
        timestamp: Time.now,
        success?: false
      )
    end

    before do
      allow(GetCurrencyRateFromForexInteractor).to receive(:call)
        .with(currency: CURRENCIES[:usdrub])
        .and_return(forex_context)
    end

    it 'success' do
      expect(context).to be_a_failure
    end

    it 'returns currency rate value from forex' do
      expect(context.value).to eq nil
    end

    it 'returns currency rate timestamp from forex' do
      expect(context.timestamp).to eq nil
    end
  end
end
