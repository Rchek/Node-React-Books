import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import './index.scss';
 
import {
	BrowserRouter as Router,
	Route,
	Switch,
	NavLink
} from 'react-router-dom'
//import { Link } from 'react-router-dom';
 

//import App from './App';
import Error from './components/Error';
 

import Home from './components/Home';
import Menu from './components/Menu';


import List_Mongo from './components/mongo/List_Mongo';
import Add_Book from './components/mongo/Add_Book';


import registerServiceWorker from './registerServiceWorker';

import jquery from 'jquery/dist/jquery.js';
import bootstrap_css from 'bootstrap/dist/css/bootstrap.css';
import bootstrap_js from 'bootstrap/dist/js/bootstrap.js';
import 'popper.js/dist/popper.js';

 
//ReactDOM.render(<Menu />, document.getElementById('navblock'));

ReactDOM.render((
	<Router>
		<div>
		<Menu  />
 
			<Switch> 
				<Route  exact path="/" component={Home} />
				<Route  path="/books/:id" component={List_Mongo} />
				<Route  path="/authors/:id" component={List_Mongo} />
				<Route  path="/addbook/" component={Add_Book} />
				<Route  component={Error} />
			</Switch>
		</div>
	</Router>
),document.getElementById('retro-container'));


registerServiceWorker();
