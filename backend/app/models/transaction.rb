# == Schema Information
#
# Table name: transactions
#
#  id           :uuid             not null, primary key
#  data         :text
#  hash_value   :text
#  name         :text
#  status       :integer          default("new_transaction")
#  subject_type :string
#  created_at   :datetime
#  block_id     :uuid
#  subject_id   :uuid
#  user_id      :uuid
#
# Indexes
#
#  index_transactions_on_block_id      (block_id)
#  index_transactions_on_created_at    (created_at)
#  index_transactions_on_status        (status)
#  index_transactions_on_subject_id    (subject_id)
#  index_transactions_on_subject_type  (subject_type)
#  index_transactions_on_user_id       (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (block_id => blocks.id)
#

class Transaction < ApplicationRecord
  belongs_to :subject, polymorphic: true
  belongs_to :block, optional: true
  belongs_to :user, optional: true

  enum status: [:new_transaction, :confirmed]

  serialize :data, Hash

  def confirms
    Block.latest_block.index - block.index
  end
end
