const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Author = new Schema({
	id_author:{
		type: String
	},
	name:{
		type: String
	},
	description:{
		type: String
	},
	base64_image:{
		type: String
	}
});


//Le premier parametre "books" est le nom de la collection
module.exports = mongoose.model('author',Author);