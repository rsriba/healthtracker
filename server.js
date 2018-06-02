// Module dependencies.
var application_root = __dirname,
    express = require('express'), //Web framework
    bodyParser = require('body-parser'), //Parser for reading request body
    path = require('path'), //Utilities for dealing with file paths
    mongoose = require('mongoose'); //MongoDB integration

//Create server
var app = express();

//Where to serve static content
app.use(express.static(path.join(application_root, '../', 'healthtracker')));
app.use(bodyParser());

//Start server
var port = 4712;

app.listen(port, function () {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});

//Connect to database
mongoose.connect('mongodb://localhost/healthtracker', function (error) {
    console.log('error connecting to database: ', error);
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log(" we're connected!");
});
//Schemas
var Item = new mongoose.Schema({
    title: String,
    date: Date,
    brand: String,
    calories: String,
    servings: String,
    carbs: String,
    protein: String,
    fat: String
});

//Models
//searchfoods
var Searchfood = mongoose.model('Searchfood', Item);
var array = [
        { title: 'banana', calories: '89', servings: '1', carbs: "23", protein: "1", fat: "0" },
        { title: 'bread', calories: '219', servings: '1', carbs: "44", protein: "6", fat: "0" },
        { title: 'coffee', calories: '0', servings: '1', carbs: "0", protein: "0", fat: "0" },
        { title: 'tea', calories: '25', servings: '1', carbs: "6", protein: "0", fat: "0" }
];
/*
Searchfood.create(array, function (err) {
    if (!err) {
        console.log('created');
    } else { console.log(err); }
});
*/
//Get a list of all searchfoods
app.get('/healthtracker/searchfoods', function (request, response) {
    return Searchfood.find(function (err, foods) {
        if (!err) {
            return response.send(foods);
        } else {
            return console.log(err);
        }
    });
});

//Get a single food by id
app.get('/healthtracker/searchfoods/:id', function (request, response) {
    return Searchfood.findById(request.params.id, function (err, food) {
        if (!err) {
            return response.send(food);
        } else {
            return console.log(err);
        }
    });
});

//addedfoods
var Addedfood = mongoose.model('Addedfood', Item);
//Get a list of all addedfoods
app.get('/healthtracker/addedfoods', function (request, response) {
    return Addedfood.find(function (err, foods) {
        if (!err) {
            return response.send(foods);
        } else {
            return console.log(err);
        }
    });
});

//Insert a new added food
app.post('/healthtracker/addedfoods', function (request, response) {
    var addedfood = new Addedfood({
        title: request.body.title,
        calories: request.body.calories,
        servings: request.body.servings,
        carbs: request.body.carbs,
        protein: request.body.protein,
        fat: request.body.fat,
        date: request.body.date,
        brand: request.body.brand
    });

    return addedfood.save(function (err) {
        if (!err) {
            console.log('created');
            return response.send(addedfood);
        } else {
            console.log(err);
        }
    });
});


//Get a single book by id
app.get('/healthtracker/addedfoods/:id', function (request, response) {
    return Addedfood.findById(request.params.id, function (err, food) {
        if (!err) {
            return response.send(food);
        } else {
            return console.log(err);
        }
    });
});

//Delete a book
app.delete('/healthtracker/addedfoods/:id', function (request, response) {
    console.log('Deleting food with id: ' + request.params.id);
    return Addedfood.findById(request.params.id, function (err, addedfood) {
        return addedfood.remove(function (err) {
            if (!err) {
                console.log('Food removed');
                return response.send('');
            } else {
                console.log(err);
            }
        });
    });
});

// Configure server
app.configure( function() {
    //parses request body and populates request.body
    app.use( express.bodyParser() );

    //checks request.body for HTTP method overrides
    app.use( express.methodOverride() );

    //perform route lookup based on url and HTTP method
    app.use( app.router );

    //Where to serve static content
    app.use( express.static( path.join( application_root, '../', 'healthtracker') ) );

    //Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});
