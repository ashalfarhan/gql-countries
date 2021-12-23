import { Min, Max } from 'class-validator'
import { ArgsType, Field, Int } from 'type-graphql'

@ArgsType()
export class GetCountriesInput {
  @Field(() => Int, {
    nullable: true,
    defaultValue: 8,
    description: 'The number to limit the result',
  })
  @Min(1)
  @Max(25)
  limit: number
}
