const express = require('express')
const mongoose = require('mongoose');
const expressGraphQl = require('express-graphql').graphqlHTTP;
const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLList, GraphQLSchema } = require('graphql');
const {Book, Author} = require('./models/Models');  // semicolon is mandatory here.
(async function connectDB(){
    try {
       await mongoose.connect("mongodb+srv://tk1234:tk1234@cluster0.zhx6t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
          useNewUrlParser: true
       });
       console.log("MongoDB connected...");
    } catch (err) {
       console.error(err.message);
       process.exit(1);
    }
 })();  // self executing.
 
const BookType = new GraphQLObjectType({
    name: "Book",
    description: "This represents a book.",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLID)},
        author: {
            type: AuthorType,
            resolve: async (book) => {
                let auth = await Author.findById(book.authorId)
                return auth; 
            }
        }
    })
})


const AuthorType = new GraphQLObjectType({
    name: "Author",
    description: "This represents an author.",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        books: {
            type: new GraphQLList(BookType),
            resolve: async (author) => {
                let booklist = await Book.find({authorId: author.id})
                return booklist;
            }
        }
    })
})


const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: "Root query.",
    fields: () => ({
        books: {
            type: new GraphQLList(BookType),
            description: "Returns all books",
            resolve: async () => {
                let booklist = await Book.find();
                return booklist;
            }
        },
        book: {
            type: BookType,
            description: "A single book based on name",
            args: {
                name: {type: GraphQLString}
            },
            resolve: async (parent, args) => {
                let b = await Book.findOne({name: args.name});
                return b;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: "Return all authors.",
            resolve: async () => {
                let authorlist = await Author.find();
                return authorlist;
            }
        }
    })
})

const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root mutation type",
    fields: () => ({
        addBook: {
            type: BookType,
            description: "Add a book.",
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                authorId: {
                    type:new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: async (parent, args) => {
                let b = new Book({name: args.name, authorId: args.authorId})
                await b.save();
                return await Book.findOne({name: args.name});
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

const app = express()
app.use('/graphql', expressGraphQl({
    schema: schema,
    graphiql: true
}))

app.listen(5000, () => {console.log("Server started at port 5000.")})