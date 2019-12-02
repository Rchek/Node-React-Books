//import bookSchema from './book';
//import { gql } from 'apollo-server';
//const gql = require('apollo-server');
const gql = require('graphql-tag');

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

//export default [linkSchema];

