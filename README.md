docker-compose build

docker-compose run backend bash

-----> `rails db:create && rails db:migrate && rails db:seed` 

docker-compose up

ROOT_URL = https://autoswipe.herokuapp.com/api/cars

ROUTES

/api/users

/api/cars


/api/users/:id -> standard crud

/api/cars/:id -> standard crud


POST /api/cars/:id/upload_image -> upload image

POST /api/cars/:id/remove_image/:image_id -> remove image

GET /api/cars/brands_models -> list of cars and models

filters :brand, :model, :first_registration


---> example filter /api/cars?filter[brand]=audi&filter[model]=a4

Authentication

POST /authentication/  --- :email, :password
POST /authentication/register    --- :email, :name, :password, :password_confirmation


