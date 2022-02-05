const {app} = require('./app.js');
const session = require('express-session')
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
require('./database');

// const host = 'http://localhost'
// const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.use(session({
    secret: process.env.SESSION_SECRET,
    // secret: "kkdkskASskkd-asdSDoasld",
    resave: false,
    saveUninitialized: false
}))

app.use('/', routes());

app.listen(process.env.PORT, ()=>{
    console.log("Server listen on ",  process.env.PORT);
});