const {app} = require('./app.js');
const session = require('express-session')
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

require('./database');
dotenv.config();

const host = 'http://localhost'
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.use(session({
    // secret: process.env.SESSION_SECRET,
    secret: "kkdkskASskkd-asdSDoasld",
    resave: false,
    saveUninitialized: false
}))

app.use('/', routes());

app.listen(port, ()=>{
    console.log(`Server listen on  ${host}:${port}/`);
});