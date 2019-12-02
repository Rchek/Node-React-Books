import { gql } from 'apollo-server';

export default gql`
  type Book {
    id_author: ID!
    title: String!
    description: String!
    author: String!
  }

  extend type Query {
    book(id_author: ID!): Book!
    books: [Book!]!
  }

  extend type Mutation {
    createBook(title: String!, description: String!): Book!
  }
`;