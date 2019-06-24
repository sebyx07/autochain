class BlockService
  def create!
    Block.transaction do
      @block = Block.create!(index: index,
                             hash_value: hash_value,
                             previous_hash: previous_hash,
                             transactions_count: transactions_count)


      new_transactions.update_all(block_id: @block.id, status: 1)
    end
  end

  def index
    return 1 if last_block.blank?
    last_block.index + 1
  end

  def hash_value
    sha = Digest::SHA256.new
    sha_seed = Time.now.utc.to_s + SecureRandom.base64 + transactions_count.to_s
    sha_seed += previous_hash if previous_hash

    sha.update(sha_seed)
    sha.hexdigest
  end

  def previous_hash
    @last_block&.hash_value
  end

  def last_block
    @last_block ||= Block.order(index: :desc).first
  end

  def transactions_count
    new_transactions.size
  end

  def new_transactions
    @new_transactions ||= Transaction.where(status: :new_transaction)
  end
end