import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Translations {
  @Field()
  br: string
  @Field()
  pt: string
  @Field()
  nl: string
  @Field()
  hr: string
  @Field({ nullable: true })
  fa?: string
  @Field()
  de: string
  @Field()
  es: string
  @Field()
  fr: string
  @Field()
  ja: string
  @Field()
  it: string
  @Field()
  hu: string
}
