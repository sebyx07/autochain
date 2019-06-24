return true if Rails.env.production?


Car.destroy_all
User.destroy_all
#

5.times do
  user = FactoryBot.create(:user, password: "12345678")
  user.activate!

  10.times do
    FactoryBot.create(:car, :audi, user: user)
    FactoryBot.create(:car, :mercedes, user: user)
  end
end
