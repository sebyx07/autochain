class CreateCars < ActiveRecord::Migration[5.2]
  def change
    create_table :cars, id: :uuid do |t|
      t.references :user, foreign_key: true, type: :uuid
      t.string :brand
      t.string :model
      t.integer :transmission_type, :integer, limit: 2
      t.integer :number_of_doors, :integer, limit: 2
      t.integer :color
      t.datetime :first_registration
      t.integer :number_of_kilometers, limit: 8
      t.integer :price_euro
      t.text :description

      t.timestamps
    end
  end
end
