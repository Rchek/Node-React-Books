/*xport default {
  Query: {
    book: async (parent, { id }, { models: { bookModel } }, info) => {

      const post = await postModel.findById({ _id: id }).exec();
      return post;
    }
  },
  Mutation: {
    createBook: async (parent, { title, description }, { models: { bookModel } }, info) => {
      const post = await postModel.create({ title, content, author: me.id });
      return post;
    },
  },
  Post: {
    author: async ({ author }, args, { models: { userModel } }, info) => {
      const user = await userModel.findById({ _id: author }).exec();
      return user;
    },
  },
};
*/


const resolvers = {
  Query: {
    user: (parent, { id }, context, info) => {
	 
      //return users.find(user => user.id === id);
       return users.find(user => user.id == id);
      //return "jeanjean";
    },
    users: (parent, args, context, info) => {
      return users;
    }
  },
  Mutation: {
    createUser: (parent, { id, name, email, age }, context, info) => {
      const newUser = { id, name, email, age };

      users.push(newUser);

      return newUser;
    },
    updateUser: (parent, { id, name, email, age }, context, info) => {
      let newUser = users.find(user => user.id === id);

      newUser.name = name;
      newUser.email = email;
      newUser.age = age;

      return newUser;
    },
    deleteUser: (parent, { id }, context, info) => {
      const userIndex = users.findIndex(user => user.id === id);

      if (userIndex === -1) throw new Error("User not found.");

      const deletedUsers = users.splice(userIndex, 1);

      return deletedUsers[0];
    }
  }

}