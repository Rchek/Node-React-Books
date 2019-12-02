let BookModel = require('./models/book.model');


const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
} = require("graphql");


const BookType = new GraphQLObjectType({
    name: "Book",
    fields: {
        id: { type: GraphQLID },
        id_author: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        author: { type: GraphQLString },
        base64_image: { type: GraphQLString },
    }
});

/*
books and book
authors and author
comments and comment
*/

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            books: {
                type: GraphQLList(BookType),
                resolve: (root, args, context, info) => {
                    return BookModel.find().exec();
                }
            },
            book: {
				type: GraphQLList(BookType),
                args: {
                    id: { type: GraphQLID },
                    id_author: { type: GraphQLString }
                },
                resolve: (root, args, context, info) => {	
					//console.log("id param is " + args.id_author);
					
					var conditon={ "id_author" : {'$regex': new RegExp(args.id_author, "i")}} ; 
					
					
					
					return new Promise((resolve) => {
					  BookModel.find(conditon).exec().then((items) => {
						return resolve(items);
					  })
					})
					
					
                }
            }
        }
    })
});

module.exports.BookType = BookType;
module.exports.schema = schema;