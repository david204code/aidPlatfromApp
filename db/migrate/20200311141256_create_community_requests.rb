class CreateCommunityRequests < ActiveRecord::Migration[6.0]
  def change
    create_table :community_requests do |t|
      t.string "title"
      t.text "description"
      t.string "request_type"
      t.string "location_lat"
      t.string "location_long"
      t.string "status"
      t.boolean "fulfilled", default: false 
      
      t.timestamps
    end
  end
end
