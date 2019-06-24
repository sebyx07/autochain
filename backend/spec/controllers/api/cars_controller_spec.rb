# frozen_string_literal: true

require "rails_helper"

describe Api::CarsController, type: :controller do
  describe "upload_image" do
    it "uploads" do
      image = Rails.root.join("spec/support/images/audi1.jpg")
      car = create(:car)

      post :upload_image, params: { id: car.id,  image: Rack::Test::UploadedFile.new(image, "image/jpeg") }

      expect(response).to have_http_status(200)
    end

    it "remove_image" do
      image = Rails.root.join("spec/support/images/audi1.jpg")
      car = create(:car)
      image = car.images.attach(io: File.open(image), filename: "audi1.jpg", content_type: "image/jpg").first

      post :remove_image, params: { id: car.id,  attachment_id: image.id }

      expect(response).to have_http_status(200)
    end
  end
end
