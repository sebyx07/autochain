# frozen_string_literal: true

module Api
  class UserResource < Api::BaseResource
    attributes :name, :email

    model_name "User"
  end
end
