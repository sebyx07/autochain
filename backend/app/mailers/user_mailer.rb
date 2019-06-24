# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def activation_needed_email(user)
    @user = user
    @url  = authentication_activate_url(user.activation_token || 'BAD-TOKEN')
    mail(to: user.email,
         subject: "Bun venit pe AutoChain")
  end

  def activation_success_email(user)
    @user = user
    mail(to: user.email,
         subject: "Contul este activ!")
  end
end
