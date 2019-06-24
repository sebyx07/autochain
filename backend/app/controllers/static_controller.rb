# frozen_string_literal: true

class StaticController < ApplicationController
  def landing
    @cars = Car.all
  end
end
