import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import typeDefs from "./types/index.js";
import resolvers from "./resolvers/index.js";
import connectDB from "./dbConnection.js";

dotenv.config();
const db = await connectDB(); // Ensure DB connection before starting the server

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => ({ db }),
});

console.log(`🚀  Server ready at: ${url}`);
