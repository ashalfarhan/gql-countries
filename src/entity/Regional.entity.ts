import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class RegionalBloc {
  @Field()
  acronym: string
  @Field()
  name: string
  @Field(() => [String], { nullable: true })
  otherNames?: string[]
  @Field(() => [String], { nullable: true })
  otherAcronyms?: string[]
}
