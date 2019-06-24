# frozen_string_literal: true
# == Schema Information
#
# Table name: cars
#
#  id                   :uuid             not null, primary key
#  brand                :string
#  color                :integer
#  description          :text
#  first_registration   :datetime
#  fuel_type            :integer          default("diesel")
#  integer              :integer
#  is_premium           :boolean          default(FALSE)
#  model                :string
#  number_of_doors      :integer
#  number_of_kilometers :bigint(8)
#  owner_name           :string
#  phone_number         :string
#  price_euro           :integer
#  transmission_type    :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  user_id              :uuid
#
# Indexes
#
#  index_cars_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#

FactoryBot.define do
  factory :car do

    is_premium do
      [true, false].sample
    end
    trait :audi do
      brand "Audi"
      model "A7"
      color :grey
      first_registration DateTime.parse("2011-01-01")
      number_of_kilometers 182_000
      price_euro 19_000
      transmission_type :automatic
      number_of_doors 5

      description <<-TEXT
VAND audi a7 2011
      TEXT

      after(:create) do |car|
        images = Rails.root.join("spec/support/images")

        (1..4).each do |i|
          car.images.attach(io: File.open(images.join("audi#{i}.jpg")), filename: "audi#{i}.jpg", content_type: "image/jpg").first
        end
      end
    end
    trait :mercedes do
      brand "Mercedes"
      model "CLS"
      color :grey
      first_registration DateTime.parse("2010-01-01")
      number_of_kilometers 202_000
      price_euro 18_000
      transmission_type :automatic
      number_of_doors 5

      description <<-TEXT
VAND mercedes cls 2010
      TEXT

      after(:create) do |car|
        images = Rails.root.join("spec/support/images")

        (1..2).each do |i|
          car.images.attach(io: File.open(images.join("mercedes#{i}.jpg")), filename: "mercedes#{i}.jpg", content_type: "image/jpg").first
        end
      end
    end

  end
end
