const passport = require('passport')
const passportLocalMongoose     = require("passport-local-mongoose");
const LocalStrategy 			= require('passport-local');
const bodyParser 				= require('body-parser');
const expressSession            = require("express-session");
const mongoose 					= require('mongoose');
							require('../models/user.js');
							require('../models/Location.js');
								require('../Services/passport.js');

const Location = mongoose.model("location");


module.exports  = app =>{

	app.use(expressSession({
	    secret: "this will help me out",
	    resave: false,
	    saveUninitialized: false
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(bodyParser.json())


	app.post('/auth/login',  (req, res)=>{ 
    const { username, password } = req.body;
		User.find({ username: username }, (err, data)=>{
			if (data.length > 0) {
				passport.authenticate("local",
		        {
		            successRedirect: res.send(req.user),
		            failureRedirect: res.send(err.message),
		            failureFlash: true,
		        })(req, res);
			}else{
			var newUser = new User({username: req.body.username});
			newUser.name = req.body.name
				User.register(new User(newUser), req.body.password, function(err, user){
			        if(err){
						if (err) {
			        		return res.status(403).json({ error: err.message});
			        	}
			        	newUser.save();
			        }
			        passport.authenticate("local",
			        {
			            successRedirect: res.send(req.user),
			            failureRedirect: res.send(err.message),
			            failureFlash: true,
			        })(req, res);
			    });
			}
		})
	})
	app.post('/auth/location', async (req, res)=>{
		const {latitude, longitude} = req.body;

		const location = new Location({
			latitude, longitude, _user:req.user
		});

		try{
			await location.save((err, data) => {
			if (err) {
			return res.status(422)
			}
			req.user._location.push(data);
			req.user.save();
			});
		} catch(err){
			res.status(422)
		}
	})	
	
	app.get('/auth/currentUser',  (req, res)=>{
		if (req.user) {
			User.findById(req.user.id).populate('_witdrawal').populate("_topup").exec((err, found)=>{
				if(err){}
				return res.send(found)
			})
		}else{
			res.send(req.user)
		}

	})
	app.get('/auth/logout', (req, res)=>{
		req.logout();
	})

}