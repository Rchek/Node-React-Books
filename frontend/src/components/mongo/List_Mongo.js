import React, { PureComponent } from 'react';
//import Item from './Item_Mongo';
import Item_Mongo from './Item_Mongo';
import {Item_Test} from './Item_Mongo';
//import {Test} from './Item_Mongo';

import axios from 'axios';

class List_Mongo extends PureComponent {
  constructor(props){
		super(props);
		
		this.get_data=this.get_data.bind(this);
 
		this.state={results:null};
		this.param=this.props.match.params.id;
					
		this.fullurl=(this.props.location.pathname).split("/");
		this.action=this.fullurl[1];
		console.log("action is " + this.action);
  }
  
  //This function gets the database data for the "softwares" model
  
  
	componentDidMount() { 
	  this._ismounted = true;
	 // console.log("component is MOUNTED");
	}

	componentWillUnmount() {
	   this._ismounted = false;
	   //console.log("component is UNMOUNTED");
	}
  
  	componentDidUpdate() {
		
		
		var new_url=this.props.location.pathname.split("/");
		//var new_url=this.props.location.pathname.split("/");
		//console.log("in componentDidUpdate ");
		//console.log("new url is  " + new_url[1] + "  and old url is " + this.fullurl[1]);
		//console.log("param is " + this.props.match.params.id + " and oild param is " + this.param);
		 //if(new_url[1] != this.fullurl[1]){
		 if(new_url[1] != this.fullurl[1] || (this.props.match.params.id!= this.param)){
			console.log("it's a new page");
			this.fullurl=new_url;
			this.action=this.fullurl[1];

			
			this.param=this.props.match.params.id;
			console.log("new action is " + this.action + " and param " + this.param);
			
		 
			setTimeout(() => {
				this.setState({results:null});
			}, 300);
 
 
		} 
    }
  
  
 
  
  get_data(){
	 
	 
	 if(this.state.results!=null){
		 return;
	 }
	 
	 if(this.action=="authors"){
		 this.action="authors";
		 //this.action="devs";
	 }
	 if(this.action=="books"){
		 this.action="books";
		 //this.action="devs";
	 }
	 
	// console.log("charger les données vec l'action " + this.action);
	 //example : http://localhost:4000/jeux/softwares/sega
	    axios.get('http://localhost:4000/books/'+this.action+"/"+this.param , this.state)
		.then(res => 
			this.setState({results:res.data}), 
			//console.log(JSON.stringify(res.data))
			)
 
  }
  
  
  
  
  render() {
	 
 
	let count=0;
    
	return (
	 
      <div className="List">
	  
        <div className="List-block  ">
		{this.get_data()}
			 
		 
			{ this.state && this.state.results &&
                <div className="row">
					{Object.keys(this.state.results).map( (key, index) => {
						count++;
						return this.renderItem(this.state.results[key], this.action, count )
					}
						 
					)}
				</div>
            }
        </div>
      </div>
    );
	
		{this.setState({results:null})}
	
  }
	//Render game, or dev, or system
	renderItem(item, type, count ){
		return   <Item_Mongo key={count} name={item.name} type={type}   item={item}   />  ;
	}
  
 
}

export default List_Mongo;
