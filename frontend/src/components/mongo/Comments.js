import React, { PureComponent }  from 'react';
import axios from 'axios';
import spinner from '../../spinner.svg';

import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class Comments extends PureComponent {

  constructor(props){
		super(props);
		
		this.onchange_comment_author = this.onchange_comment_author.bind(this);
		this.onchange_comment_body = this.onchange_comment_body.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.get_date = this.get_date.bind(this);
		
		
		this.state = {
			book_id:this.props.book_id,
			comment_author:'',
			comment_body:'',
			status:'pending',
			comment_date:this.get_date(),
			response:"",
			response_state:"hidden",
			spinner_state:"hidden"
		}
		
		//this.old_comments = this.get_old_comments();
		 
		//console.log("test with old comments function for id " +this.props.id_jeu + " --  " + JSON.stringify(this.get_old_comments()));
		 
  }
  
  
  onchange_comment_author(e){
	  console.log("a jour auteur " + e.target.value);
	  this.setState({
		  comment_author: e.target.value
	  });
  }
  
  onchange_comment_body(e){
 
	  this.setState({
		  comment_body: e.target.value
	  });
  }
  
 get_date(){
		
		var date=new Date().toLocaleString() ;
		console.log("date is " + date);
				//return new Date();
				//return "bibou date";
				return date;
		}
   

  
  onSubmit(e){
	e.preventDefault();
	  
	  //Show ajax
	  
	console.log("formulaire envoyé with data " + JSON.stringify(this.state));
	 
	 // return;
	 /* axios.post('http://localhost:4000/books/addcomment' , this.state)
		.then(res => console.log(res.data));
		*/
	let self=this;

	//Show wheel and hide previous message
	self.setState({
		response : "",
		response_state : "",
		spinner_state : ""
	})
	
axios.post('http://localhost:4000/books/addcomment' , this.state)
		.then(function(res){
			console.log("response says -> " + JSON.stringify(res.data));
			console.log("clear response says -> " + JSON.stringify(res.data.comment));
			self.setState({
				response : res.data.comment,
				response_state : res.data.comment,
				spinner_state : "hidden"
			});
		});
		
	  /*
		this.setState({
			comment_author:'',
			comment_body:'',
			comment_date:this.get_date()
		})
		*/
  }
  
  //This function gets the database data
  render() {
	  let count=0;
				return(
				  <div className="Comment-block item-block col-md-6"> 
				   <div className="description">Write a comment:</div>
				   		<form onSubmit={this.onSubmit}>
				
					
				{/* Nom */}
				<FormGroup>
					<label>Your name: </label>
					<FormControl type="text"
							className="form-control"
							value={this.state.auteur}
							onChange={this.onchange_comment_author}
							required />
				</FormGroup>
				
				{/* Description */}
				<FormGroup>
					<label>Comment: </label>
					<FormControl type="text"
							className="form-control required"
							value={this.state.commentaire}
							onChange={this.onchange_comment_body}
							required />
				</FormGroup>			
 
				
				{/* Submit */}
				<FormGroup>		
					<FormControl type="submit"
							className="form-control submit-comment-btn"
							value="Submit comment"
							className="btn btn-primary"
							/>
				</FormGroup>
			</form>
			
					<div className="ajax-block" >
						<img src={spinner} className={this.state.spinner_state} />
						<div className={"ajax-response " + this.state.response_state}> {this.state.response}</div>
					</div>
			
				  </div>
				);
				
				
  }
  
	
 
}

export default Comments;

 