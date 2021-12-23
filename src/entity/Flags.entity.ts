import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Flags {
  @Field()
  svg: string
  @Field()
  png: string
}
