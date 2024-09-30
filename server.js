// server to handle backend of a blog website

// dependencies
const {PORT} = require('./constants')

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



// index page (where blog shows up)
app.get('/', async (req,res) => {
    try{

        res.render('index', { 
            title: 'Blog Page', 
            message: 'Welcome to my Blog page!', 
            posts: posts,
            category: "All"});
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

    console.log(dateTime);

    // get post and add time
    var post = req.body;
    post.time = dateTime.join(' ');

    addPost(PostsPath, post);
    
    res.redirect('/');
});




app.listen(PORT);
console.log('Server is listening on port ' + PORT);