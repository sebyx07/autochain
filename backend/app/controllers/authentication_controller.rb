# frozen_string_literal: true

class AuthenticationController < ApplicationController
  skip_forgery_protection raise: false
  def get_current_user
    render json: current_user
  end
  def login_post
    if login(params[:email], params[:password], params[:remember_me])
      return redirect_to_js(root_path, "Logat")
    end

    render_error_js("Invalid login")
  end

  def register_post
    RegisterForm.new(params) do |form|
      unless form.valid?
        return render_form_errors_js(form)
      end

      redirect_to_js(authentication_path, "Verifica #{params[:email]} pentru activare")
    end
  end

  def logout_delete
    logout
    redirect_to_js(root_path, "Logged Out!")
  end

  def activate
    @user = User.load_from_activation_token(params[:code])
    if @user.present?
      @user.activate!
      redirect_to root_path
    end

    redirect_to_js(authentication_path, "Cod Invalid de login")
  end

  class RegisterForm < FormService::Base
    strong_params :email, :name, :password, :password_confirmation

    validates :password, length: { minimum: 6, maximum: 64 }
    validates :password_confirmation, length: { minimum: 6, maximum: 64 }
    validate :passwords_match

    def passwords_match
      unless password == password_confirmation
        errors.add(:password_confirmation, "parolele nu se potrivesc")
      end
    end

    process do
      self.user = User.create!(strong_params.slice(:email, :name, :password))
    end
  end
end

module FormService
  class Base < OpenStruct
    include ActiveModel::Validations

    def initialize(params)
      super
      self.params = params
      handle_process
      yield self
    end

    def valid?
      return @valid unless @valid.nil?
      super
    end

    private

      def handle_process
        klass_strong_params = self.class.strong_params
        klass_process_block = self.class.process

        if params.is_a? ActionController::Parameters
          self.strong_params = params.permit(klass_strong_params)
        elsif params.is_a? Hash
          self.strong_params = params.slice(*klass_strong_params)
        end

        if valid?
          begin
            self.instance_eval(&klass_process_block)
          rescue ActiveRecord::RecordInvalid => e
            errors.merge!(e.record.errors)
            @valid = false
          end
        end
      end



      class << self
        def process(&block)
          if block.nil?
            return @process_block
          end
          @process_block = block
        end

        def strong_params(*params)
          if params.empty?
            return @strong_params
          end
          @strong_params = params.map(&:to_s)
        end

        def model_name
          ActiveModel::Name.new(self, nil, "temp")
        end
      end
  end
end
