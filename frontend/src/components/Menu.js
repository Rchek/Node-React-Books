import React, { PureComponent } from 'react';
//import { Link } from 'react-router-dom';
import { NavLink,BrowserRouter as Router } from 'react-router-dom';

class Menu extends PureComponent {

  constructor( ){
		 super();
 
  }
  
  
  //This function gets the database data
  render() {
	 return (
		<nav className="navbar .navbar-inverse navbar-expand-lg navbar-light bg-light">
			<a className="navbar-brand app-title" href="/">Library</a>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
			<ul className="navbar-nav mr-auto">
			
			   <li className="nav-item">
				<NavLink className="nav-link" to="/books/all/" >Books</NavLink>
				</li>
				 <li className="nav-item">
									<NavLink className="nav-link" to="/authors/all/">Authors</NavLink>
				</li>
				<li className="nav-item">
				<NavLink className="nav-link" to="/addbook/">Add a Book</NavLink>
				</li>
 
			</ul>
			 
			</div>
		</nav>
	)
   
  }
 
 
}

	
	
export default Menu;

 