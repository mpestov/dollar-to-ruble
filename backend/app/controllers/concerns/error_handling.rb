# frozen_string_literal: true

module ErrorHandling
  extend ActiveSupport::Concern

  included do
    rescue_from ActionController::ParameterMissing, with: :render_400

    def render_400(exception)
      errors = {
        detail: exception,
        status: '400'
      }
      render_errors errors, 400
    end

    def render_422(attributes_errors)
      prepared_errors = attributes_errors.map do |attribute, errors|
        {
          source: {
            pointer: "/data/attributes/#{attribute}"
          },
          detail: errors,
          status: '422'
        }
      end
      render_errors prepared_errors, 422
    end

    def render_errors(errors, status)
      render json: { errors: Array.wrap(errors) }, status: status
    end
  end
end
