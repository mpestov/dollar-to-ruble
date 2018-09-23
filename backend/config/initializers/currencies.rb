# frozen_string_literal: true

CURRENCIES = HashWithIndifferentAccess.new YAML.load_file("#{Rails.root}/config/currencies.yml")
