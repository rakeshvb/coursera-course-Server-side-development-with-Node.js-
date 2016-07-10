var mongoose = require('mongoose'),
    assert = require('assert');

//var Dishes = require('./models/dishes');
var Promos = require('./models/promotions');
//var Leaders = require('./models/leaderships');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new dish
    Promos.create({
        name: 'barrito',
        image: 'rv.jpg',
        label: 'spicy',
        price: '4.95',
        description: 'Mexican food'
        
    }, function (err, promo) {
        if (err) throw err;
        console.log('promo created!');
        console.log(promo);

        var id = promo._id;

        // get all the dishes
        setTimeout(function () {
            Promos.findByIdAndUpdate(id, {
                    $set: {
                        description: 'tasty mexican food'
                    }
                }, {
                    new: true
                })
                .exec(function (err, promo) {
                    if (err) throw err;
                    console.log('Promo updated!');
                    console.log(promo);

                    

                    
                        db.collection('promotions').drop(function () {
                            db.close();
                        });
                    });
                });
        }, 3000);
    });