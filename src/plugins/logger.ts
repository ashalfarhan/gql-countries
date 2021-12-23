import { PluginDefinition } from 'apollo-server-core'
import { logger } from '../utils/logger'

export const loggerPlugins: PluginDefinition = {
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
