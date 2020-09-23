const express = require("express"),
	  app = express(),
	  bodyParser = require("body-parser"),
	  mongoose = require("mongoose"),
	  flash = require("connect-flash"),
	  passport = require("passport"),
	  localStrategy = require("passport-local"),
	  methodOverride = require("method-override"),
	  Campground = require("./models/campgrounds"),
	  Comment = require("./models/comments"),
	  User = require("./models/users"),
	  seedDB = require("./seeds");

const commentRoutes = require("./routes/comments"),
	  campgroundRouts = require("./routes/campgrounds"),
	  indexRoutes = require("./routes/index");

mongoose.connect(process.env.DATABASEURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => console.log("connected to db"))
.catch(error => console.log(error.message));
// seedDB(); seed the database
// mongoose.connect("mongodb+srv://nadavDB:Bgtbgt91@cluster0.s3tzs.mongodb.net/<dbname>?retryWrites=true&w=majority", {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true
// })
// .then(() => console.log("connected to db"))
// .catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Nucha",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
    next();
});


//REQUIRING ROUTES
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRouts);
app.use("/campgrounds/:id/comments", commentRoutes);

const port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("sraver has start");
});