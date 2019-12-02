const express = require('express');
const app = express();
const body_parser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

 

const books_routes = express.Router();

 
let Book = require('./models/book.model');
let Author = require('./models/author.model');
let Comment = require('./models/comment.model');


app.use(cors());
 
app.use(body_parser.json({limit: '10mb'}));
app.use(body_parser.urlencoded({limit: '10mb', extended: true}));


app.listen(PORT, function (){
	console.log("Serveur en route sur le ports -> " + PORT);
});


/*
app.listen(PORT, function(){
	console.log("Server running on Port : " + PORT);
});
*/
//mongoose.connect("mongodb://127.0.0.1:27017/especes",{useNewUrlParser:true});
const connection = mongoose.connection;

connection.once('open',function(){
	console.log("MongoDB connection established with success s");
});




/*********Routes for Books**********/


books_routes.route('/books/:id').get(function(req,res){
	
	var param= req.params.id;
	console.log("trouver un jeu avec id " + param );
	
	//Either developer or console
	var conditon={ "status": { $nin: ["pending","declined"] } };
	
	
	if(param!="all"){
		conditon={  "status": { $nin: ["pending","declined"] } ,"id_author" :  {'$regex': new RegExp(param, "i")}} ; 
	}
	
 
	//depending on the id//If it says all 
	 
	//Softwares.find( function(err,softwares){ 
	Book.find(conditon , function(err,softwares){ 
		if(err){
			//console.log("error -> " + err);
		}else{
			 //console.log("show all " + JSON.stringify(softwares));
			res.json(softwares);
		}
	}); 
 
});

 

books_routes.route('/authors/:id').get(function(req,res){

 
	var param= req.params.id;
	var query_conditon={};
	if(param!="all"){
		//developer_conditon
		query_conditon={  "id_author" :  {'$regex': new RegExp(param, "i")} }; 
	}
	
	//Softwares.find( function(err,softwares){ 
	Author.find( query_conditon,function(err,devs){ 
		if(err){
			//console.log("error -> " + err);
		}else{
			//console.log("show all DEV " + JSON.stringify(devs));
			res.json(devs);
		}
	}); 
 
});


books_routes.route('/addcomment').post(function(req,res){
	
	let comment = new Comment(req.body);
	
	//console.log("poster les données " + JSON.stringify(req.body)); 
	comment.save()
	.then(commentaire => {
		res.status(200).json({'comment':'Your comment has been submitted to approval.'});
	})
	.catch(err => {
		res.status(400).send("echec de l'ajout de l'commentaire")
	});
 
});


books_routes.route('/addbook').post(function(req,res){
	
	let book = new Book(req.body);
	
	console.log("poster les données " + JSON.stringify(req.body)); 
//	return;
	
	book.save()
	.then(commentaire => {
		res.status(200).json({'comment':'Your Book has been submitted to approval.'});
	})
	.catch(err => {
		res.status(400).send({'comment':"An error occured. Your book cannot be added"});
	});
 
});

books_routes.route('/getcomment/:id').get(function(req,res){
	
	var param= req.params.id;
	//Show only approved comments
    var condition= {"status": { $nin: ["pending","declined"] } , "book_id" :  param};
	
	//Comment.find({  "book_id" :  param, "status":approved"} ,function(err,commentaire){ 
	Comment.find(condition ,function(err,commentaire){ 
		if(err){
			 console.log("error -> " + err);
		}else{
			res.json(commentaire);
		}
	}); 
 
});



books_routes.route('/graphqltest/').get(function(req,res){
	
	var response={response:"graphql_test"};
	
	res.json(response);
	
	
 
});


app.use('/books' , books_routes);

mongoose.connect("mongodb://127.0.0.1:27017/Books",{useNewUrlParser:true});
