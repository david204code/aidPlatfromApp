class CommunityRequestsController < ApplicationController

  #post request
  def create
    communityRequest = CommunityRequest.create!(
      title: params['communityRequest']['title'],
      description: params['communityRequest']['description']
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

end
