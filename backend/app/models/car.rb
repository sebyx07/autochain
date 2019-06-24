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

class Car < ApplicationRecord
  belongs_to :user, optional: true
  has_many_attached :images

  enum transmission_type: [:manual, :semi_automatic, :automatic]
  enum color: [:red, :green, :blue, :white, :black, :grey, :yellow, :pink]
  enum fuel_type: [:diesel, :gas]

  around_save :create_transaction
  around_destroy :create_transaction

  def create_transaction
    operation = :update
    data = changes

    if new_record?
      operation = :create
    elsif destroyed?
      data = {"id" => id}
      operation = :destroy
    end
    yield

    if operation == :create
      data = attributes
    end

    TransactionService.new(self, operation, data).create!
  end
end
