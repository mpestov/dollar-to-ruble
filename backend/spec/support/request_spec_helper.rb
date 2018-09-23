# frozen_string_literal: true

module RequestSpecHelper
  def response_json
    JSON.parse response.body
  end

  def json_api_data
    response_json['data']
  end

  def json_api_errors
    response_json['errors']
  end

  def json_api_attributes(attributes)
    {
      attributes: attributes
    }
  end
end
