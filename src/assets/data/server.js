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

const tickets = userDb.Tickets;

const expiresIn = '1h';

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

 // function verifyToken(token) {
 // return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined? decode : err)
 // }

function isAuthenticated({username, password}) {
  return users.find(user => user.userName === username && user.password === password)
}

function userExists({username}) {
  return users.find(user => user.username !== username)
}

function emailExists({email}) {
  return users.find(user => user.email === email)
}

server.post('/auth/register', (req, res) => {
  const {username, email} = req.body;
  const userId = userExists({username});
  const emailVer = emailExists({email});
  if (userId) {
    const status1 = 401;
    const message1 = "Username already exists!";
    res.status(status1).json({status1, message1});
  } else {
    if(emailVer) {
      const status2 = 401;
      const message2 = "Email already exists!";
      res.status(status2).json({status2, message2});
    } else {
      server.post(users);
      const status3 = 200;
      const message3 = "User has been registered!";
      res.status(status3).json({status3, message3});
    }
  }
});

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


/*
server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (req.headers.authoriation === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401;
    const message = 'Error access_token is revoked';
    res.status(status).json({status, message})
  }
  try {
    verifyToken(req.headers.authorization.split(' ')[1]);
    next();
  } catch (err) {
    const status = 401;
    const message = 'Error access_token is revoked';
    res.status(status).json({status, message})
  }
});
*/

server.get('/match', (req, res) => {
res.json(matches);
});

server.get('/teams', (req, res) => {
  res.json(teams);
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running in http://localhost:3000');
});
