import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import {
  // ApolloServerPluginLandingPageGraphQLPlayground,
  PluginDefinition,
} from 'apollo-server-core'
import { buildSchema } from 'type-graphql'
import { MainResolver } from './resolvers/main.resolvers'
import pino from 'pino'

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
})

const loggerPlugins: PluginDefinition = {
  serverWillStart: async s => {
    s.logger = logger
    s.logger.info('Starting Graphql Server')
  },

  async requestDidStart(ctx) {
    if (ctx.request.operationName === 'IntrospectionQuery') {
      return
    }

    ctx.logger.info({
      operationName: ctx.request.operationName,
      query: ctx.request.query,
      variables: ctx.request.variables,
    })

    return {
      didEncounterErrors: async ({ logger, errors, response }) => {
        logger.debug(response)
        errors.forEach(error => logger.error({ error }))
      },
    }
  },
}

async function main() {
  const schema = await buildSchema({
    resolvers: [MainResolver],
  })
  const server = new ApolloServer({
    schema,
    plugins: [
      loggerPlugins,
      //  ApolloServerPluginLandingPageGraphQLPlayground()
    ],
  })
  const { url } = await server.listen()
  console.log('Listening on %s', url)
}

main()
