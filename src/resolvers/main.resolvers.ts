import { Country } from '../entity/Country.entity'
import { Arg, Args, Query, Resolver } from 'type-graphql'
import countries from '../resources/countries.v2.json'
import { GetCountriesInput } from './main.input'
import sampleSize from 'lodash.samplesize'

@Resolver()
export class MainResolver {
  @Query(() => [Country], { description: 'Get countries with limit' })
  getCountries(
    @Args()
    { limit }: GetCountriesInput
  ) {
    return countries.slice(0, limit)
  }

  @Query(() => [Country], { description: 'Get random countries with limit' })
  getRandomCountries(
    @Args()
    { limit }: GetCountriesInput
  ) {
    return sampleSize(countries, limit)
  }

  @Query(() => [Country], {
    nullable: true,
    description:
      'Search by country name. It can be the native name or partial name',
  })
  getCountriesByName(
    @Arg('name', { description: 'Name of the country' }) name: string,
    @Arg('exact', {
      nullable: true,
      defaultValue: false,
      description:
        'If this true, then the search will be find the exact same of the `name`',
    })
    exact: boolean
  ) {
    return countries
      .filter(c =>
        exact
          ? c.name.toLowerCase() === name.toLowerCase()
          : c.name.toLowerCase().includes(name.toLowerCase())
      )
      .slice(0, 8)
  }

  @Query(() => Country, { description: 'Get single random country' })
  getRandomCountry() {
    return countries[Math.round(Math.random() * countries.length - 1)]
  }

  @Query(() => Country, {
    nullable: true,
    description: 'Get country by 2-letter code',
  })
  getCountryByCode(
    @Arg('code', { description: '2-letter code' }) code: string
  ) {
    return countries.find(country => country.alpha2Code === code)
  }

  @Query(() => Country, {
    nullable: true,
    description: 'Get country by its currency',
  })
  getCountryByCurrency(
    @Arg('currency', { description: 'Currency of the country' })
    currency: string,
    @Arg('exact', {
      nullable: true,
      defaultValue: false,
      description:
        'If this true, then the search will be find the exact same of the `name`',
    })
    exact: boolean
  ) {
    return countries.find(country =>
      country.currencies?.some(curr =>
        exact
          ? curr.name?.toLowerCase() === currency.toLowerCase() ||
            curr.code?.toLowerCase() === currency.toLowerCase()
          : curr.name?.toLowerCase().includes(currency.toLowerCase()) ||
            curr.code?.toLowerCase().includes(currency.toLowerCase())
      )
    )
  }

  @Query(() => Country, {
    nullable: true,
    description: 'Get country by its capital city',
  })
  getCountryByCapital(
    @Arg('capital', {
      description: 'Capital city of a country',
    })
    capital: string,
    @Arg('exact', {
      nullable: true,
      defaultValue: false,
      description:
        'If this true, then the search will be find the exact same of the `name`',
    })
    exact: boolean
  ) {
    return countries.find(c =>
      exact
        ? c.capital?.toLowerCase() === capital.toLowerCase()
        : c.capital?.toLowerCase().includes(capital.toLowerCase())
    )
  }

  @Query(() => Country, {
    nullable: true,
    description: 'Get Country by calling code',
  })
  getCountryByCallingCode(@Arg('callingCode') callingCode: string) {
    return countries.find(country => country.callingCodes.includes(callingCode))
  }
}
