class AddFuel < ActiveRecord::Migration[5.2]
  def change
    add_column :cars, :fuel_type, :integer, default: 0
    add_column :cars, :owner_name, :string
    add_column :cars, :phone_number, :string
  end
end
