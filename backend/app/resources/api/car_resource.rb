# frozen_string_literal: true

module Api
  class CarResource < Api::BaseResource
    key_type :string
    attributes :brand, :model, :color, :first_registration, :number_of_kilometers, :price_euro, :transmission_type,
               :number_of_doors, :description, :fuel_type, :phone_number, :owner_name, :is_premium

    attribute :images

    model_name "Car"
    has_one :user

    def images
      @model.images.map do |image|
        Rails.application.routes.url_helpers.url_for(image.variant(resize: "400x400"))
      end
    end

    def self.records(options = {})
      Car.with_attached_images
    end

    def self.default_sort
      [{field: 'created_at', direction: :desc}]
    end

    filters :brand, :model, :color, :first_registration, :number_of_kilometers, :transmission_type,
            :number_of_doors, :description, :fuel_type, :user_id


    filter :price_euro, apply: ->(records, value, _options) {
      records.where('price_euro >= ? AND price_euro <= ?', value[0], value[1])
    }


    filter :first_registration, apply: ->(records, value, _options) {
      start_year = "01/01/#{value[0]}".to_date
      end_year = "01/01/#{value[1]}".to_date
      records.where('first_registration >= ? AND first_registration <= ?', start_year, end_year)
    }
  end
end
