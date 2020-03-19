class CommunityRequestsController < ApplicationController

  #post request
  def create
    communityRequest = CommunityRequest.create!(
      title: params['communityRequest']['title'],
      description: params['communityRequest']['description'],
      request_type: params['communityRequest']['request_type'],
      location_lat: params['communityRequest']['location_lat'],
      location_long: params['communityRequest']['location_long'],
      status: params['communityRequest']['status'],
      fulfilled: params['communityRequest']['fulfilled']
    ) 
    
    if communityRequest
      session[:communityRequest] = communityRequest
      render json: {
        status: :created,
        communityRequest: communityRequest
      }
    else
      render json: { status: 500 }
    end
  end

  # Get request
  def index
    @community_requests = CommunityRequest.all
    # @community_requests = CommunityRequest.first
    render json: { data: @community_requests }
  end

end
