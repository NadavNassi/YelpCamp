const mongoose = require("mongoose"),
	  Comment = require("./models/comments");
let Campground = require("./models/campgrounds");

let data = [
	{
		name: "Cloud's rest",
		img: "https://images.pexels.com/photos/4323815/pexels-photo-4323815.jpeg?auto=compress&cs=tinysrgb&h=350",
		description: "The standard Lorem Ipsum passage, used since the 1500s"
	},
	{
		name: "Goat trail",
		img: "https://images.pexels.com/photos/4484242/pexels-photo-4484242.jpeg?auto=compress&cs=tinysrgb&h=350",
		description: "blah blah blah"
	},
	{
		name: "Apalechian trail",
		img: "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&h=350",
		description: "blup blup blup"
	}
]


function seedDB(){
//remove all campgrounds
		Campground.remove({}, function(err){
			if(err){
				console.log(err);
			}
		console.log("removed campgrounds");
// create new campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err);
				} else{
					console.log("added campground");
					// add comments
					Comment.create(
						{
							text:"this place is great",
							author:"Homer"
						}, function(err, comment){
							if(err){
								console.log(err);
							} else{
								campground.comments.push(comment);
								campground.save();
								console.log("Created comment");
							}
						});
				}
			});
		});
	});
}

module.exports = seedDB;
