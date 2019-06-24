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

require "rails_helper"

RSpec.describe Car, type: :model do
  describe "factories" do
    it "audi" do
      user = create(:user)
      create(:car, :audi, user: user)
    end

    it "mercedes" do
      user = create(:user)
      create(:car, :mercedes, user: user)


    end
  end
end
