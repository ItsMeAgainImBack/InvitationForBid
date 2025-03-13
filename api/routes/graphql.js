import { typeDefs, resolvers } from '../models/all'

/*
import { ApolloServer, gql } from 'apollo-server-micro'


const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
})

const startServer = apolloServer.start();
  
export default async function handler(req, res) {
    await startServer;
    await apolloServer.createHandler({
      path: "/api/routes/graphql",
    })(req, res);
}
  
export const config = {
    api: {
      bodyParser: false,
    },
}
*/