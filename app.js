const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo');

const port = process.env.PORT || 8080;
const app = express();

// Load config
dotenv.config({ path: './config/config.env' })

//Passport config
require('./config/passport')(passport)

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));


const db = require('./models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`DB Connected and server running on ${port}.`);
    });
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });


  // Method override
app.use(
    methodOverride(function (req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
      }
    })
  )
  
//   // Logging
//   if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'))
//   }
  
//   // Handlebars Helpers
//   const {
//     formatDate,
//     stripTags,
//     truncate,
//     editIcon,
//     select,
//   } = require('./helpers/hbs')
  
//   // Handlebars
//   app.engine(
//     '.hbs',
//     exphbs({
//       helpers: {
//         formatDate,
//         stripTags,
//         truncate,
//         editIcon,
//         select,
//       },
//       defaultLayout: 'main',
//       extname: '.hbs',
//     })
//   )
//   app.set('view engine', '.hbs')
  
  //Sessions
  app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false
    })
  )
  
  // Passport middleware
  app.use(passport.initialize())
  app.use(passport.session())
  
  // Set global var
  app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
  })
  
  // Static folder
  app.use(express.static(path.join(__dirname, 'public')))