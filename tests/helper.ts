import { gql } from 'apollo-server'

export const getCountriesByName = gql`
  query ($name: String!, $exact: Boolean) {
    getCountriesByName(name: $name, exact: $exact) {
      name
    }
  }
`

export const getCountries = gql`
  query ($limit: Int) {
    getCountries(limit: $limit) {
      name
    }
  }
`
