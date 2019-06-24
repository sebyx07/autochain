# frozen_string_literal: true

module Api
  class CarsController < Api::BaseController
    def upload_image
      image = current_car.images.attach(params[:image]).last
      url = Rails.env.test? ? nil : Rails.application.routes.url_helpers.url_for(image.variant(resize: "400x400"))
      render json: { saved: "OK", url: url }
    end

    def remove_image
      ActiveStorage::Attachment.find_by(id: params[:attachment_id]).purge
      head :ok
    end

    def brands_models
      render file: Rails.root.join("lib/car_models/list.json"), content_type: :json, layout: false
    end

    def current_car
      @current_car ||= Car.find_by(id: params[:id])
    end
  end
end
