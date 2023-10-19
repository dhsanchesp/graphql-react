import path from 'path';
import "reflect-metadata";
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { buildSchema } from 'type-graphql'
import { UserResolver } from './src/resolvers/UserResolver';

async function main() {
    const schema = await buildSchema({
        resolvers: [
            UserResolver,
        ],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    })

    const server = new ApolloServer({
        schema,
    })

    const { url } = await startStandaloneServer(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
        listen: { port: 4000 },
      });
      console.log(`🚀  Server ready at ${url}`);
}

main();