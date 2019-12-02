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
		this.action=this.fullurl[2];
		//console.log("action is " + this.action);
  }
  
  //This function gets the database data for the "softwares" model
  
  	componentDidUpdate() {
		var new_url=this.props.location.pathname.split("/");
		console.log("in componentDidUpdate ");
		console.log("new url is  " + new_url[2] + "  and old url is " + this.fullurl[2]);
		if(new_url[2] != this.fullurl[2]){
			console.log("it's a new page");
			this.fullurl=new_url;
			this.action=this.fullurl[2];

			
			this.param=this.props.match.params.id;
			console.log("new action is " + this.action + " and param " + this.param);
			setTimeout(() => {
				this.setState({results:null});
			}, 200);

			// console.log("STATE IS NOW NULL, the result gives me " + JSON.stringify(this.state) );
		}
    }
  
  
 
  
  get_data(){
	 
	 if(this.state.results!=null){
		 return;
	 }
	 
	 if(this.action=="developers"){
		 this.action="devs";
		 //this.action="devs";
	 }
	 if(this.action=="ludotheque"){
		 this.action="softwares";
		 //this.action="devs";
	 }
	if(this.action=="consoles"){
	 this.action="systems";
	 //this.action="devs";
	}
	 //console.log("charger les données vec l'action " + this.action);
	 //example : http://localhost:4000/jeux/softwares/sega
	    axios.get('http://localhost:4000/jeux/'+this.action+"/"+this.param , this.state)
		.then(res => 
			this.setState({results:res.data}), 
			//console.log(JSON.stringify(res.data))
			)
 
  }
  
  
  
  
  render() {
	 
	 
	let default_images_path="http://www.raoul-chekiil.com/adminPortal/Lab/Founded/img/games/"; 
	let company_images_path="http://www.raoul-chekiil.com/adminPortal/Lab/Laravel/images/company_logos/exported/"; 
	let count=0;
    
	return (
	 
      <div className="List">
	  
        <div className="List-block  ">
		{this.get_data()}
			 
		 
			{ this.state && this.state.results &&
                <div className="row">
					{Object.keys(this.state.results).map( (key, index) => {
						 count++;
						  
						//console.log("fullitem object -> " + JSON.stringify(this.state.results[key]));
						 //console.log("fdescription is -> " + JSON.stringify(this.state.results[key].description));
						// return this.renderItem(this.state.results[key], "softwares", count, default_images_path, company_images_path)
						return this.renderItem(this.state.results[key], this.action, count, default_images_path, company_images_path)
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
	renderItem(item, type, count,default_images_path, company_images_path){
		return   <Item_Mongo key={count} name={item.name} type={type}   fullitem={item} default_images_path={default_images_path}  company_images_path={company_images_path} />  ;
	}
  
 
}

export default List_Mongo;
