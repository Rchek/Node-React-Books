const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Book = new Schema({
	title:{
		type: String
	},
	description:{
		type: String
	},
	author:{
		type: String
	},
	year:{
		type: String
	},
	isbn:{
		type: String
	},
	id_author:{
		type: String
	},
	base64_image:{
		type: String
	},
	status:{
		type: String
	}
	
});


//Le premier parametre "books" est le nom de la collection
module.exports = mongoose.model('books',Book);