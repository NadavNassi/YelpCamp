const express = require("express"),
	  router = express.Router(),
	  passport = require("passport"),
	  User = require("../models/users");


//ROOT ROUTE
router.get("/", function(req, res){
	res.render("landing");
});

//=====================
//AUTH RUOTES
//=====================

//register form
router.get("/register", function(req, res){
	res.render("register");
});

//handeling sign up logic
router.post("/register", function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			return res.render("register", {"error": err.message});
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome " + req.user.username);
			res.redirect("/campgrounds");
		});
	});
});

//log in page
router.get("/login", function(req, res){
	res.render("login");
});

//login logic
router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function(req, res){
});

//logout logic
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged You Out");
	res.redirect("/campgrounds");
});

//MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
