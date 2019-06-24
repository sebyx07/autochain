class AddIsPremium < ActiveRecord::Migration[5.2]
  def change
    add_column :cars, :is_premium, :boolean, default: false
  end
end
