require('dotenv').config(); //config dotenv

const express = require('express');

const route = require('./routes/index');

const app = express();

require('./redis/blacklist');

route(app);

const PORT = 3000;

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));