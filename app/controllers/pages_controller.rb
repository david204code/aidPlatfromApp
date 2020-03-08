class PagesController < ApplicationController
  def index
  end

  def home
    render json: { status: "It's working" }
  end
end
