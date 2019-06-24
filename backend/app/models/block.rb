# == Schema Information
#
# Table name: blocks
#
#  id                 :uuid             not null, primary key
#  hash_value         :text
#  index              :bigint(8)
#  previous_hash      :text
#  transactions_count :integer
#  created_at         :datetime
#
# Indexes
#
#  index_blocks_on_created_at  (created_at)
#  index_blocks_on_index       (index)
#

class Block < ApplicationRecord
  has_many :transactions


  class << self
    def latest_block
      order(index: :desc).first
    end
  end

end
