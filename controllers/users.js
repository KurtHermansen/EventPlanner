const db = require('../models');
const User = db.users;
// const { userJson } = require('../routes/auth')


// Load config
// dotenv.config({ path: './config/config.env' })

// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     secret: process.env.SECRET,
//     baseURL: process.env.BASE_URL,
//     clientID: process.env.CLIENT_ID,
//     issuerBaseURL: process.env.ISSUER_BASE_URL
//   };  
//   // auth router attaches /login, /logout, and /callback routes to the baseURL
//   router.use(auth(config));
  
//   // req.isAuthenticated is provided from the auth router
//   router.get('/', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
//   });

//   router.get('/profile', requiresAuth(), (req, res) => {
//     res.send(JSON.stringify(req.oidc.user));
//   })

  module.exports.createUser = (req, res) => {
    try {
        const user = new User(req.body);
        user
            .save()
            .then((data) => {
                console.log(data);
                res.status(201).send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Some error occureed while creating the User.'
                });
            });
    } catch (err) {
        res.status(500).json(err);
    }
  }


// module.exports = router