const mongoose 		= require("mongoose");

const locationSchema = new mongoose.Schema({
		longitude: Number,
		latitude: Number,
		_driver:[{type: mongoose.Schema.Types.ObjectId, ref:'driver'}],
		created:{type:Date, default:Date.now}
	})

mongoose.model("location", locationSchema);