const express = require('express')
const expressGraphQl = require('express-graphql').graphqlHTTP;

const {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull} = require('graphql')

const app = express()

const authors = [
    {id: 1, name: "a1"},
    {id: 2, name: "a2"},
    {id: 3, name: "a3"}
]

const books = [
    {id: 1, name: "b1", authorId: 1},
    {id: 2, name: "b2", authorId: 2},
    {id: 3, name: "b3", authorId: 1},
    {id: 4, name: "b4", authorId: 3},
    {id: 5, name: "b5", authorId: 3},
    {id: 6, name: "b6", authorId: 2}
]

const BookType = new GraphQLObjectType({
    name: "Book",
    description: "This represents a book written by an author.",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLInt)},
        author: {
            type: AuthorType,
            resolve: (book) => {return authors.find(author => author.id === book.authorId)}
        }
    })
})


const AuthorType = new GraphQLObjectType({
    name: "Author",
    description: "This represents an author of a book.",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        books: {
            type: new GraphQLList(BookType),
            resolve: (author) => {
                return books.filter(book => book.authorId === author.id)
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
            description: "List of all books.",
            resolve: () => books
        },
        book: {
            type: BookType,
            description: "A single book.",
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (parent, args) => {return books.find(book => book.id === args.id)}
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: "List of all authors.",
            resolve: () => authors
        }
    })
})

const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root mutation.",
    fields: () => ({
        addBook: {
            type: BookType,
            description: "Add a book.",
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                authorId: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: (parent, args) => {
                const book = {id: books.length + 1, name: args.name, authorId: args.authorId}
                books.push(book)
                return book
            }
        },
        
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

app.use('/graphql', expressGraphQl({
    schema: schema,
    graphiql: true
}))
app.listen(5000, () => {console.log('server started at port 5000')})