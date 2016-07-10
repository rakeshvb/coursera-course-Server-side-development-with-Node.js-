var mongoose = require('mongoose'),
    assert = require('assert');

//var Dishes = require('./models/dishes');
//var Promos = require('./models/promotions');
var Leaders = require('./models/leaderships');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new dish
    Leaders.create({
        name: 'Rakesh',
        image: 'rv2.jpg',
        designation: 'owner',
        abbr: 'CEO',
        description: 'CS graduate USC'
        
    }, function (err, leader) {
        if (err) throw err;
        console.log('leader created!');
        console.log(leader);

        var id = leader._id;

        // get all the dishes
        setTimeout(function () {
            Promos.findByIdAndUpdate(id, {
                    $set: {
                        description: 'Fighton'
                    }
                }, {
                    new: true
                })
                .exec(function (err, leader) {
                    if (err) throw err;
                    console.log('Leader updated!');
                    console.log(leader);

                    

                    
                        db.collection('leaderships').drop(function () {
                            db.close();
                        });
                    });
                });
        }, 3000);
    });