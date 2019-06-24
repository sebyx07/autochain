# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: "norepy@autoChain.com"
  layout "mailer"
end
