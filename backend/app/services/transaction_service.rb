class TransactionService
  def initialize(car, operation, data)
    @car = car
    @operation = operation
    @data = data
  end

  def create!
    Transaction.create!(name: name, data: @data, hash_value: hash_value, status: :new_transaction, subject: @car, user: @car.user)
  end

  def hash_value
    sha = Digest::SHA256.new
    sha.update(@data.to_json + Time.now.utc.to_s + SecureRandom.base64)
    sha.hexdigest
  end

  def name
    "car-#{@operation}"
  end
end