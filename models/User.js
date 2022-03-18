const mongoose 		= require("mongoose"),
	  passportLocalMongoose   = require("passport-local-mongoose");

const punchUserSchema = new mongoose.Schema({
	username:String,
	password:String,
	fullname:String,
	role:{type:String, default:'Client'},
	bookings: {type:String, default:null},
	_location:[{type: mongoose.Schema.Types.ObjectId, ref:'location'}],
	created:{type:Date, default:Date.now}
	})

punchUserSchema.plugin(passportLocalMongoose)

mongoose.model("Punchuser", punchUserSchema);