class CreateBlocks < ActiveRecord::Migration[5.2]
  def change
    create_table :blocks, id: :uuid do |t|
      t.integer :index, limit: 8, index: true
      t.integer :transactions_count
      t.text :previous_hash
      t.text :hash_value

      t.datetime :created_at, index: true
    end
  end
end
