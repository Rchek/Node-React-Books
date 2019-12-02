import React, { PureComponent } from 'react';
import axios from 'axios';

class Previous_Comments extends PureComponent {

  constructor(props){
		super(props);
		
		 
		
		
		this.get_old_comments = this.get_old_comments.bind(this);
		 
		this.state = {
			comments:null
		}
		
		this._ismounted=true;
		//console.log("test with old comments function for id " +this.props.id_jeu + " --  " + JSON.stringify(this.get_old_comments()));
		 
  }
  
  
	componentDidMount() { 
	  this._ismounted = true;
	 // console.log("PREVIOUS COMMENTS component is MOUNTED");
	}

	componentWillUnmount() {
	   this._ismounted = false;
	   //console.log("PREVIOUS COMMENTS component is UNMOUNTED");
	}
	
	
  
  
   get_old_comments(){
	 
	//console.log("get old comments and component  mount state says " +  this._ismounted );
	var book_id=this.props.book_id;
	//let response=["jeanjean"];
	 //console.log("get old comments for id jeu " + id_jeu);
	 /*
	   axios.get('http://localhost:4000/books/getcomment/'+book_id )
		.then(res => 
			this.setState({comments:res.data}), 
	 
			)
		*/

	var self= this;
	
	 axios.get('http://localhost:4000/books/getcomment/'+book_id )
		.then(function(res){
			//console.log("got a response");
			if( self._ismounted){
				self.setState({comments:res.data});
			}
			
		})
			
	
	  //console.log("reponse ? " + JSON.stringify(this.old_comments));
  }

 
  
  //This function gets the database data
  render() {
 
	  let count=0;
	 
		  return(
				  <div className="Dev-item item-block col-md-6"> 
		 
			{/*Load previous comments */}
				  <div className="previous-comments-title" >Previous comments</div>
				  {this.get_old_comments()}
				  
				  
				  { this.state && this.state.comments &&
					<div className="row previous-comments-parent-block">
						{Object.keys(this.state.comments).map( (key, index) => {
							count++;
							return this.renderItem(this.state.comments[key].comment_author,  count, this.state.comments[key].comment_body, this.state.comments[key].comment_date)
						}
							 
						)}
					</div>
				}
			
				</div>
				);
				
			this.state = {
				comments:null
			}	
	 
				
  }
  
renderItem(author, count, body, date){  
	return <div key={count}  className="col-md-12 previous-comment-block"><span className="author"> {author} </span> said  on the <span className="comment-date">{date}</span> : <span className="comment-body">{body} </span></div>
	
}
 
}

export default Previous_Comments;

 