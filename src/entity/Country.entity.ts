import { Field, Float, ObjectType } from 'type-graphql'
import { Currency } from './Currency.entity'
import { Flags } from './Flags.entity'
import { Language } from './Language.entity'
import { RegionalBloc } from './Regional.entity'
import { Translations } from './Translations.entity'

@ObjectType()
export class Country {
  @Field()
  name: string
  @Field(() => [String])
  topLevelDomain: string[]
  @Field()
  alpha2Code: string
  @Field()
  alpha3Code: string
  @Field(() => [String])
  callingCodes: string[]
  @Field({ nullable: true })
  capital?: string
  @Field(() => [String], { nullable: true })
  altSpellings?: string[]
  @Field()
  subregion: string
  @Field()
  region: string
  @Field()
  population: number
  @Field(() => [Float], { nullable: true })
  latlng?: number[]
  @Field()
  demonym: string
  @Field(() => Float, { nullable: true })
  area?: number
  @Field(() => [String])
  timezones: string[]
  @Field(() => [String], { nullable: true })
  borders?: string[]
  @Field({ nullable: true })
  nativeName: string
  @Field({ nullable: true })
  numericCode: string
  @Field(() => Flags, { nullable: true })
  flags: Flags
  @Field(() => [Currency], { nullable: true })
  currencies?: Currency[]
  @Field(() => [Language])
  languages: Language[]
  @Field(() => Translations)
  translations: Translations
  @Field()
  flag: string
  @Field(() => [RegionalBloc], { nullable: true })
  regionalBlocs?: RegionalBloc[]
  @Field({ nullable: true })
  cioc?: string
  @Field()
  independent: boolean
  @Field({ nullable: true })
  gini?: number
}
