const jsonServer = require('json-server');
const fs = require('fs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middleWares = jsonServer.defaults();
const userDb = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'));

server.use(middleWares);
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

const SECRET_KEY = '123456789';

const users = userDb.Users;

const matches = userDb.Matches;

const teams = userDb.Teams;

const expiresIn = '1h';

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

function isAuthenticated({username, password}) {
  return users.find(user => user.userName === username && user.password === password)
}

server.post('/auth/login', (req, res) => {
  const {username, password} = req.body;
  const bck = isAuthenticated({username, password});
  if (bck === null) {
    const status = 401;
    const message = "Incorrect Username or Password";
    res.status(status).json({status, message});
    return
  }
  const access_token = createToken({username, password});
  res.status(200).json({access_token, user: bck });
});

server.get('/Match', (req, res) => {
  res.json(matches);
});

server.get('/Team', (req, res) => {
  res.json(teams);
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running in http://localhost:3000');
});
