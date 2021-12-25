import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { Country } from '../src/entity/Country.entity'
import { MainResolver } from '../src/resolvers/main.resolvers'
import {
  getCountries,
  getCountriesByName,
  getCountryByCurrency,
  getCountryByCapital,
} from './helper'

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

      expect(data?.getCountries).toHaveLength(8)
    })

    it('Should return given limit', async () => {
      const limit = 2
      const { data } = await server.executeOperation({
        query: getCountries,
        variables: { limit },
      })

      expect(data?.getCountries).toHaveLength(limit)
    })

    it('Should return error if above limit', async () => {
      const limit = 200
      const { data, errors } = await server.executeOperation({
        query: getCountries,
        variables: { limit },
      })

      // Nothing to return
      expect(data).toBeNull()

      expect(errors).toHaveLength(1)
    })

    it('Should return error if below limit', async () => {
      const limit = -200
      const { data, errors } = await server.executeOperation({
        query: getCountries,
        variables: { limit },
      })

      // Nothing to return
      expect(data).toBeNull()

      expect(errors).toHaveLength(1)
    })
  })

  describe('getCountriesByName query', () => {
    it('Should return something when given name without exact', async () => {
      const name = 'ind'
      const { data } = await server.executeOperation({
        query: getCountriesByName,
        variables: { name },
      })

      const result = data?.getCountriesByName as Country[]
      expect(result.some(res => res.name.toLowerCase().includes(name))).toBe(
        true
      )
    })

    it('Should return nothing when exact', async () => {
      const name = 'ind'
      const { data } = await server.executeOperation({
        query: getCountriesByName,
        variables: { name, exact: true },
      })

      const result = data?.getCountriesByName
      expect(result).toHaveLength(0)
    })
  })

  describe('getCountryByCurrency query', () => {
    it('Should return something when given name without exact', async () => {
      const currency = 'rupi'
      const { data } = await server.executeOperation({
        query: getCountryByCurrency,
        variables: { currency },
      })

      const result = data?.getCountryByCurrency as Country
      expect(
        result.currencies?.some(
          curr =>
            curr.code.toLowerCase().includes(currency) ||
            curr.name.toLowerCase().includes(currency)
        )
      ).toBe(true)
    })

    it('Should return nothing when exact', async () => {
      const currency = 'rupi'
      const { data } = await server.executeOperation({
        query: getCountryByCurrency,
        variables: { currency, exact: true },
      })

      expect(data?.getCountryByCurrency).toBeNull()
    })
  })

  describe('getCountryByCapital query', () => {
    it('Should return something when given name without exact', async () => {
      const capital = 'jak'
      const { data } = await server.executeOperation({
        query: getCountryByCapital,
        variables: { capital },
      })

      const result = data?.getCountryByCapital as Country
      expect(result.capital?.toLowerCase().includes(capital)).toBe(true)
    })

    it('Should return nothing when exact', async () => {
      const capital = 'jak'
      const { data } = await server.executeOperation({
        query: getCountryByCapital,
        variables: { capital, exact: true },
      })

      expect(data?.getCountryByCapital).toBeNull()
    })
  })
})
