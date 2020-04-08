class AddUserRefToCommunityRequests < ActiveRecord::Migration[6.0]
  def change
    add_reference :community_requests, :user, foreign_key: true
  end
end
