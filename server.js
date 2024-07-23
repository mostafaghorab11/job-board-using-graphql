import { ApolloServer } from '@apollo/server';
import cors from 'cors';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import express from 'express';
import { readFile } from 'node:fs/promises';
import { resolvers } from './resolvers.js';
// import { authMiddleware, handleLogin } from './auth.js';

const PORT = 9000;

const app = express();
app.use(cors(), express.json());

// app.post('/login', handleLogin);

const typeDefs = await readFile('./schema.graphql', 'utf8');

const apolloServer = new ApolloServer({typeDefs, resolvers});
await apolloServer.start();

app.use('/graphql',apolloMiddleware(apolloServer));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint is http://localhost:${PORT}/graphql`);
});