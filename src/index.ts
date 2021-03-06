import * as mongoose from 'mongoose';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as listItem from './routes/list-item';
const cors = require('cors');
const groceryItemRouter = require('./routes/list-item');
const creds = require('../creds.json');
const SERVER_PORT = 8000;
const TEST_SERVER_PORT = 3000;
const app = express();



const USER_NAME = creds.username;
const PASSWORD = creds.password;
const HOST_NAME = 'localhost:27017';
const DATABASE_NAME = creds.dbName;
const AUTH_SOURCE = creds.authSource;

(<any>mongoose).Promise = global.Promise;
let options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};
mongoose.connect(`mongodb://${USER_NAME}:${PASSWORD}@${HOST_NAME}/${DATABASE_NAME}?authSource=${AUTH_SOURCE}`, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get("/", (req, res) => res.json({message: "Welcome to the shopping list!"}));

app.route('/list-item')
  .get(listItem.getListItems)
  .post(listItem.postListItem);
app.route('/list-item/:id')
  .get(listItem.getListItem)
  .delete(listItem.deleteListItem)
  .put(listItem.updateListItem);

const PORT = process.env.NODE_ENV === 'test' ? TEST_SERVER_PORT : SERVER_PORT;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});

module.exports = app;
