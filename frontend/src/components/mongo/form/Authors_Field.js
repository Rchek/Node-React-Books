import React, { PureComponent } from 'react';
import axios from 'axios';
 

class Authors_Field extends PureComponent {
  
  constructor(props){
		super(props);

		this.onchange_author=this.onchange_author.bind(this);
		
		this.state = {
			id_author:""
		}
		
 
  }
  
  
  
  onchange_author(e){
	  //console.log("developer changed, pass to parent");
	
	 
	  this.props.onChange(e);
  }
  //This function gets the database data
  
  get_authors(){
	  
	 if(this.state.results!=null){
		 return;
	 }
	 
	console.log("get all a");
	  axios.get('http://localhost:4000/books/authors/all/' , this.state)
		.then(res => this.setState({results:res.data}));
		
  }
  
  render() {
	  
		let count=0;
		
		return (
	   
	 <div className="form-group">
	<label>Authors</label>
	{this.get_authors()}
	
 
		{ this.state && this.state.results &&
		 <select id="developers-dropdown" onChange={this.onchange_author} required>
			<option key="0000ss"  value=""  >Choose an author</option>
			{Object.keys(this.state.results).map( (key, index) => {
				count++;
				return (this.renderItem(this.state.results[key].id_author,   this.state.results[key].name, "author_"+count ));
			})}
		</select>
		}
		
		
		</div>
		);
	 
  }
  
  renderItem(id_author,name,count){
	 return  <option key={count}  value={id_author} authorname={name}   >{name}</option>
	  //return <div key={count} ><span className="id"> {id} </span> called className="comment-date">{name} </div>
	  //return <div key={count} ><span className="id"> {id} </span> called className="comment-date">{name} </div>
  }
 
}

export default Authors_Field;
 