const express 			= require("express");
const mongoose 			= require("mongoose");
const cookieSession 	= require('cookie-session');
const passport 			= require('passport');
const Controller 		= require('./Controller/controller');
const bodyParser 		= require('body-parser');
						require('./models/user');
						require('./Services/passport');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://laganch:VL9925zUzmqUjl65@cryptoapp.i6lmg.mongodb.net/cryptoapp?retryWrites=true&w=majority');


const app = express();


app.use(bodyParser.json())
app.use(cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: "jkdjfldfhdhkdnkfjghjsgjskshsj"
}));


app.use(passport.initialize());
app.use(passport.session());

Controller(app);

app.get("/", (req, res) =>{
	res.send("welcome to this site isnt")
})

if (process.env.NODE_ENV === "production") {

	app.use(express.static('client/build'));

	const path = require('path');

	app.get('*', (req, res)=>{
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}
app.listen(process.env.PORT || 5000, ()=>{
	console.log("server running")
})