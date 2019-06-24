class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions, id: :uuid do |t|
      t.uuid :subject_id, index: true
      t.string :subject_type, index: true
      t.uuid :user_id, index: true
      t.references :block, foreign_key: true, type: :uuid
      t.text :hash_value
      t.integer :status, index: true, default: 0
      t.text :name
      t.text :data

      t.datetime :created_at, index: true
    end
  end
end
