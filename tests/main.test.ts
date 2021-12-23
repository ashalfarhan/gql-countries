import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { MainResolver } from '../src/resolvers/main.resolvers'
import { getCountries, getCountriesByName } from './helper'
import { Country } from '../src/entity/Country.entity'

describe('Main Resolver test', () => {
  let server: ApolloServer

  beforeAll(async () => {
    const schema = await buildSchema({
      resolvers: [MainResolver],
    })

    server = new ApolloServer({
      schema,
    })
  })

  describe('getCountries query', () => {
    it('Should return default limit', async () => {
      const { data } = await server.executeOperation({
        query: getCountries,
      })

      expect(data?.getCountries.length).toBe(8)
    })

    it('Should return given limit', async () => {
      const limit = 2
      const { data } = await server.executeOperation({
        query: getCountries,
        variables: { limit },
      })

      expect(data?.getCountries.length).toBe(limit)
    })

    it('Should return null if above limit', async () => {
      const limit = 200
      const { data } = await server.executeOperation({
        query: getCountries,
        variables: { limit },
      })

      expect(data).toBeNull()
    })

    it('Should return null if below limit', async () => {
      const limit = -200
      const { data } = await server.executeOperation({
        query: getCountries,
        variables: { limit },
      })

      expect(data).toBeNull()
    })
  })

  describe('getCountriesByName query', () => {
    it('Should return something when given name without exact', async () => {
      const name = 'ind'
      const { data } = await server.executeOperation({
        query: getCountriesByName,
        variables: { name },
      })

      const result = data?.getCountriesByName
      expect(
        result.some((res: Country) => res.name.toLowerCase().includes(name))
      ).toBe(true)
    })

    it('Should return nothing when exact', async () => {
      const name = 'ind'
      const { data } = await server.executeOperation({
        query: getCountriesByName,
        variables: { name, exact: true },
      })

      const result = data?.getCountriesByName
      expect(result.length).toBe(0)
    })
  })
})
