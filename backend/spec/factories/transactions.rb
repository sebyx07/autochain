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

FactoryBot.define do
  factory :transaction do
    subject nil
    block nil
    hash "MyText"
  end
end
