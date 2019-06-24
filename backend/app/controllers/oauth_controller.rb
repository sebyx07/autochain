class OauthController < ApplicationController

  def oauth
    login_at(params[:provider])
  end

  def callback
    provider = params[:provider]
    if @user = login_from(provider)
      redirect_to root_path
    else
      @user = create_from(provider)

      reset_session # protect from session fixation attack
      auto_login(@user)
      redirect_to root_path
    end
  end

  private
  def auth_params
    params.permit(:code, :provider)
  end
end
