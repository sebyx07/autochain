# == Schema Information
#
# Table name: authentications
#
#  id         :bigint(8)        not null, primary key
#  provider   :string           not null
#  uid        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :uuid             not null
#
# Indexes
#
#  index_authentications_on_provider_and_uid  (provider,uid)
#

class Authentication < ApplicationRecord
  belongs_to :user
end
