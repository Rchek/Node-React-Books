import React, { PureComponent } from 'react';
import axios from 'axios';
import Authors_Field from './form/Authors_Field';
import ReactDOM from 'react-dom';
//import FileBase64 from 'react-file-base64';

//import resizebase64 from 'resize-base64';  
import Resizer from 'react-image-file-resizer';
import spinner from '../../spinner.svg';
/*import 'mongodb';
import 'mongo-db';
import 'mongodb-core';
*/
class Add_Book extends PureComponent {
  constructor(props){
		super(props);
		
		this.onchange_year = this.onchange_year.bind(this);
		this.onchange_title = this.onchange_title.bind(this);
		this.onchange_author = this.onchange_author.bind(this);
		this.onchange_isbn = this.onchange_isbn.bind(this);
		this.onchange_description = this.onchange_description.bind(this);
 
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			title:"",
			description:"",
			author:"",
			year:"",
			isbn:"",
			base64_image:"",
			status:"pending",
			response:"",
			response_state:"hidden",
			spinner_state:"hidden"
		}
		
		 this.fileChangedHandler = this.fileChangedHandler.bind(this);
 
  }
  
  
 
  
	onchange_description(event){
	  console.log("the developer has been changed in the parent update state with " + event.target.value );
	   this.setState({
		  description: event.target.value
	  });
	}
 
	onchange_year(event){
	  console.log("the developer has been changed in the parent update state with " + event.target.value );
	   this.setState({
		  year:  event.target.value
	  });
	}
  
	onchange_title(event){
	  console.log("the developer has been changed in the parent update state with " + event.target.value );
	
	   this.setState({
		  title: event.target.value
	  });
	  
	    console.log("show full state " + JSON.stringify(this.state) );
	}
  
	onchange_author(e){
		 var author_name = e.target.selectedOptions[0].getAttribute("authorname");
		 
	  console.log("the system has been changed in the parent update state with " + e.target.value + " for author " + author_name );
	   this.setState({
		  id_author: e.target.value,
		  author: author_name
	  });
	}
  
	onchange_isbn(event){
	  console.log("the developer has been changed in the parent update state with " + event.target.value );
	   this.setState({
		  isbn: event.target.value
	  });
	}
 
  
	onSubmit(e){
	  e.preventDefault();
	  let self=this;
	  //Show wheel and hide previous message
		self.setState({
		response : "",
		response_state : "",
		spinner_state : ""
	})
	
	  console.log("formulaire envoyé with data " + JSON.stringify(this.state) );
	  //return;
	  //console.log(`nom de l espece : ${this.state.espece_nom} `);
	  /*
	  axios.post('http://localhost:4000/books/addbook' , this.state)
		.then(res => console.log(res.data));
		*/
	 axios.post('http://localhost:4000/books/addbook' , this.state)
		.then(function(res){
			//res => console.log(res.data);
			self.setState({
				response : res.data.comment,
				response_state : res.data.comment,
				spinner_state : "hidden"
			});
		});
 
  }
  
  
	componentDidMount() {
		console.log("component did mount");
        //const self = this;
		//console.log("coponent did mount ? ");
        //server.getSomeData(data => self.setState({ data: data }));
    }
	
	 componentDidUpdate() {
		 
    }
  
	 fileChangedHandler(event) {
        var fileInput = false
        if(event.target.files[0]) {
            fileInput = true
        }
        if(fileInput) {
            Resizer.imageFileResizer(
                event.target.files[0],
                400,
                400,
                'JPEG',
                100,
                0,
                uri => {
                    this.setState({ base64_image: uri });
                },
                'base64'
            );
        }
		
 
    }
  
 
  
  render() {
	  
	return (
      <div className="Books">
        <div className="Books-block  ">
		<h3>Add a title</h3>
			
			<form onSubmit={this.onSubmit} id="add-books-form">
				
					
				{/* Name */}
				<div className="form-group ">
					<label>Title: </label>
					<input type="text"
							className="form-control"
							value={this.state.title}
							onChange={this.onchange_title}
							required />
				</div>
				
				{/* Description */}
				<div className="form-group">
					<label>Description: </label>
					<input type="text"
							className="form-control"
							value={this.state.description}
							onChange={this.onchange_description}
							required />
				</div>			
				 
				{/* Developer - dropdown */}
				<Authors_Field 
				 onChange={this.onchange_author}
				/>
	 
				
				{/* Image uploader */}
				<div className="form-group">		
					<label>Upload another image: </label>
				<input type="file" onChange={this.fileChangedHandler} required/>
				</div>
 
				
				{/* Submit */}
				<div className="form-group" id="submit-book">		
					<input type="submit"
							className="form-control"
							value="Add Book"
							className="btn btn-primary"
							/>
				</div>
			</form>
			
			<div className="ajax-block" >
						<img src={spinner} className={this.state.spinner_state} />
						<div className={"ajax-response " + this.state.response_state}> {this.state.response}</div>
			</div>			
        </div>
      </div>
    );
  }
  //Render game, or dev, or system
 
  
 
}

export default Add_Book;
