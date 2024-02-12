import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType({description: "Todo quick aggregations type"})
export class AggregationsType {
  @Field(() => Int, { description: "Total todos" })
  total: number;

  @Field(() => Int, { description: "Pending todos" })
  pending: number;

  @Field(() => Int, { description: "Completed todos" })
  completed: number;

  @Field(() => Int, { deprecationReason: "This field is deprecated, use total instead" })
  totalCompleted: number;
}
