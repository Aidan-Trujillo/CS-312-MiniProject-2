// server to handle backend of a blog website

// dependencies
const {PORT} = require('./constants')
const {getJoke, formatURL} = require('./utils');
const session = require('express-session');

// server initialization
var express = require('express');
var path = require('path');

// start app
var app = express();

// set view engine to ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/Website'));
app.use(express.urlencoded({ extended: true }));

// set static files
app.use(express.static(path.join(__dirname, 'Public')));


// Use the session middleware and cookies
app.use(session({
    secret: 'slijfoijwoij98230909i40opjfsljfi02pkflsjfj290j3rfklsjfph928h', 
    resave: false,           
    saveUninitialized: true, 
    cookie: { secure: false } 
  }));


// index page (where blog shows up)
app.get('/', async (req,res) => {
    try{

        res.render('index', { 
            title: 'Joke API', 
            message: 'Welcome to my Joke page!',
            error: ''
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error processing the form');
    }
});


// post page (making a blog post) 
app.post('/submit', async (req,res) => {
    // get the time
    const dateTimeFull = Date().toLocaleString().split(' ');
    const dateTime = dateTimeFull.slice(0, 5); 

    // get post and add time
    var input = req.body;

    // get the URL formatted  
    const URL = formatURL(input);  

    // send the axios api request
    const response = await getJoke(URL)

    console.log(URL)
    console.log(dateTime);
    console.log(response)
    
    // check if there was an error
    if (response.data.error === "true") {
        res.render('index', { 
            title: 'Joke API', 
            message: 'Welcome to my Joke page!',
            error: 'Try Again :( ' 
        });
    } else {
        if (response.data.type === "single"){
            req.session.joke = response.data.joke
        } else {
            req.session.setup = response.data.setup
            req.session.delivery = response.data.delivery
        }

        req.session.type = response.data.type
        res.redirect('/reveal')
    }


});


// get request for the reveal joke should be in session
app.get('/reveal', (req, res) => {
    // get the joke and find out if it's single or twopart
    if (req.session.type === "single") {
        res.render('./reveal', {
            joke: req.session.joke,
            setup: "",
            delivery: "none",
            type: req.session.type
        })
    } else {
        res.render('./reveal', {
            joke: "",
            setup: req.session.setup,
            delivery: req.session.delivery,
            type: req.session.type
        })
    }
})





app.listen(PORT);
console.log('Server is listening on port ' + PORT);