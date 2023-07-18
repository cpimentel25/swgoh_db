import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "../graphql/schema";
import resolvers from "../graphql/resolvers";
import { Application } from "express";

async function graphQlConfig(app: Application) {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await server.start();
    server.applyMiddleware({ app });

    console.log(`🚀🚀🚀 ~ Server ready at: http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`);

    return server;

  } catch (error) {
    console.error('Error starting ~ GraphsQl Server', error)
    process.exit(1)
  }
}

export default graphQlConfig;
