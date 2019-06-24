# frozen_string_literal: true

module RedirectHelper
  def redirect_to_js(path, message)
    return render json: { redirect_to: path }
    respond_to do |format|
      format.json {}
      format.html { redirect_to(path) }
      format.js do
        render "js_helpers_redirect/_visit", locals: { path: path, message: message }, formats: [:js]
      end
    end
  end

  def render_form_errors_js(model)
    return  render json: { errors: model.errors.messages }, status: 422
    respond_to do |format|
      format.js do
        render "js_helpers_redirect/_form_errors", locals: { model: model }, status: 422, formats: [:js]
      end
      format.json do
        render json: { errors: model.errors.messages }, status: 422
      end
    end
  end

  def render_error_js(message)
    return render json: { error: message }, status: 422
    respond_to do |format|
      format.js do
        render "js_helpers_redirect/_error", locals: { message: message }, status: 422, formats: [:js]
      end
      format.json do
        render json: { error: message }, status: 422
      end
    end
  end

  def render_ok_js(message)
    return         render json: { message: message }
    respond_to do |format|
      format.js do
        render "js_helpers_redirect/_ok", locals: { message: message }, formats: [:js]
      end
      format.json do
        render json: { message: message }
      end
    end
  end
end
