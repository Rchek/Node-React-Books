import React, { PureComponent } from 'react';
import Comments from './Comments';
import Previous_Comments from './Previous_Comments';

class Item_Mongo extends PureComponent {
  //This function gets the database data
  render() {
	switch(this.props.type){
		case "books":
			return (
				  <div className="Dev-item item-block col-md-6"> 
				   <div className="title-block">{this.props.item.title}</div><div className="author-block">by <a href={"/authors/"+this.props.item.id_author} className="author-link">{this.props.item.author}</a></div>
				   <div className="row">
						<div className="description col-md-8">
								{this.props.item.description}  
						</div>
						<div className="encoded-image photo col-md-4"><img className="img-thumbnail" src={this.props.item.base64_image}  /></div>
					</div>
					 
					{/*pass parameters : id_jeu */}
					<Previous_Comments book_id={this.props.item._id} /> 
					<Comments book_id={this.props.item._id} />
				  </div>
			);
		case "authors":
			return (
				  <div className="Games-item item-block col-md-6"> 
				    <div className="title-block">{this.props.item.name} </div>
					<div className="row">
						<div className="description col-md-8">{this.props.item.description}</div>
							{/*<div className="photo col-md-4"><img className="img-thumbnail" src={'https://d1rtheiow3yx8d.cloudfront.net/img/games/' + this.props.fullitem.id_console + '/' +this.props.fullitem.id_jeu + '_Cover.jpg' } /></div> */}
							<div className="encoded-image photo col-md-4"><img className="img-thumbnail" src={this.props.item.base64_image}  /></div>
					</div>
					<div className="row">
						<div className="col-md-12 books-by"><a href={"/books/"+this.props.item.id_author} >Books by {this.props.item.name}</a></div>
					</div>
				
				 </div>
			);
		default:
			return (
				  <div className="System-item item-block col-md-6"> 
				    <div className="title-block">{this.props.fullitem.name}</div>
					<div className="row">
						<div className="description col-md-8">
								{this.props.fullitem.description}
						</div>
						{/*<div className="photo col-md-4"><img className="img-thumbnail" src={'https://d1rtheiow3yx8d.cloudfront.net/img/games/' + this.props.fullitem.id + '/' +this.props.fullitem.id + '_console.jpg' } /></div>*/}
						<div className="photo col-md-4"><img className="img-thumbnail" src={this.props.default_images_path+this.props.fullitem.id+"/"+this.props.fullitem.id + "_console.jpg" }  alt="system"/></div>
					</div>
					<div className="row">
						<div className="col-md-12"><a href={"/jeux/ludotheque/"+this.props.fullitem.id} >Games made on {this.props.fullitem.name}</a></div>
					</div>
				  </div>
			);
	}
   
  }
 
}

export default Item_Mongo;
export const Item_Test=function(){
	return (<div>test</div>);
}
