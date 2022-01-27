const {app} = require('./app.js');
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');

require('./database');



const host = 'http://localhost'
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.use('/', routes());

app.listen(port, ()=>{
    console.log(`Server listen on  ${host}:${port}/`);
});