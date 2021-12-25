import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { MainResolver } from './resolvers/main.resolvers'
import { loggerPlugins } from './plugins/logger'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

async function main() {
  const schema = await buildSchema({
    resolvers: [MainResolver],
  })

  const server = new ApolloServer({
    schema,
    plugins: [
      loggerPlugins,
      ApolloServerPluginLandingPageGraphQLPlayground({
        title: 'GQL Countries',
      }),
    ],
  })

  const { url } = await server.listen({
    port: process.env.PORT || 4000,
  })

  console.log('Listening on %s', url)
}

main()
