## login-jwt
This project allows to perform CRUD of users and posts, containing a login system using JWT.

# Step 1
Clone the repository on your machine.
Run `git clone https://github.com/WellingtonMaia/login-jwt.git`

# Step 2
Run `npm install`.

# Step 3
Configure the database in `src/database/config/config.json`.

# Step 4
Run `npx sequelize-cli db:migrate` to create tables.

# Step 5
Run `npx sequelize-cli db:seed:all` to insert data in database.

# Step 6
Crete an copy of `.example.env` file and rename it to `.env`. 

# Step 7
Run `node -e "console.log( require('crypto').randomBytes(256).toString('base64') )"` to get an key.
Into of file `.env` add the key generate on tag `JWT_KEY`.

# Step 8
It's necessary add the **base url** on `.env` file.

# Step 9
Run `npm start` to initialize server.

# Notes
Is necessary install **mysql** and **redis** on your machine.

Use **Postman** or **Insomnia** to send request and receive responses.
