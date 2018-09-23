# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ErrorHandling

  def data_params
    params.require(:data)
  end

  def data_attributes
    raise ActionController::ParameterMissing, 'data[attributes]' unless data_params[:attributes]
    data_params[:attributes]
  end
end
