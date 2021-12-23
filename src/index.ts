import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { MainResolver } from './resolvers/main.resolvers'
import { loggerPlugins } from './plugins/logger'

async function main() {
  const schema = await buildSchema({
    resolvers: [MainResolver],
  })

  const server = new ApolloServer({
    schema,
    plugins: [loggerPlugins],
  })

  const { url } = await server.listen({ port: process.env.PORT || 4000 })
  console.log('Listening on %s', url)
}

main()
