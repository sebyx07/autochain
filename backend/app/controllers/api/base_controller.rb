# frozen_string_literal: true

module Api
  class BaseController < ApplicationController
    include JSONAPI::ActsAsResourceController
    skip_forgery_protection raise: false

    def verify_content_type_header
      true
    end

    def verify_accept_header
      true
    end

    def ensure_correct_media_type
      true
    end
  end
end
