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

export const getCountryByCurrency = gql`
  query ($currency: String!, $exact: Boolean) {
    getCountryByCurrency(currency: $currency, exact: $exact) {
      currencies {
        code
        name
      }
    }
  }
`

export const getCountryByCapital = gql`
  query ($capital: String!, $exact: Boolean) {
    getCountryByCapital(capital: $capital, exact: $exact) {
      capital
    }
  }
`
