const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Comment = new Schema({
	book_id:{
		type: String
	},
	comment_author:{
		type: String
	},
	comment_body:{
		type: String
	},
	comment_date:{
		type: String
	}
	,
	status:{
		type: String
	}
});


//Le premier parametre "software" est le nom de la collection
module.exports = mongoose.model('comments',Comment);