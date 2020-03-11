class CreateCommunityRequests < ActiveRecord::Migration[6.0]
  def change
    create_table :community_requests do |t|

      t.timestamps
    end
  end
end
