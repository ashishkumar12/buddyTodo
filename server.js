require('dotenv').config();
require('./config/bootstrap').init();
global._ = require('lodash');
global.express = require('express')
const app = express();
const PORT = process.env.PORT;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const admin = require('./middlewares/admin');
const buddy = require('./middlewares/buddy');
const middleware = require('./middlewares/checkForRole');
/*
* setting views configurations
*/
const nunjucks = require('nunjucks');
// setting nunjucks as view engine
app.set('view engine', 'html');
global.nunjucks_env = nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true
});

app.use('/static', express.static(path.join(__dirname, 'assets')));
app.use('/build', express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(session({
    secret: '&JHLDNnksdlkalbcsbiubkcs698jjbjb6d654sdbkdsa5d@jhfk*7g768&^*87jhskd',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({url: process.env.DB_URL})
}));

// app.use('/',middleware.checkForRole);
app.use('/',require('./routes/home'));
app.use('/auth', require('./routes/auth'));
app.use('/admin', admin.isAdmin, require('./routes/admin'));
app.use('/user', buddy.isBuddy, require('./routes/user'));

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});