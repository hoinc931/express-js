const express = require('express'); 
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookie_parser = require('cookie-parser');
const morgan = require("morgan");
const path = require('path');

const server = require("http").createServer(app);

const db = require('./database/connect_db');
const routes = require('./routes');

app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.static(path.join(__dirname, "")))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(cookie_parser());

db.connect();

routes(app);

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log("Server is running on port: ", PORT))
