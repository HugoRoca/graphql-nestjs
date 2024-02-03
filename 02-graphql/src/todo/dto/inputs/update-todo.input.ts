import { Field, InputType, Int } from "@nestjs/graphql";
import { IsBoolean, IsInt, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";

@InputType()
export class UpdateTodoInput {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  id: number

  @Field(() => String, { description: "What needs to be done", nullable: true})
  @IsString()
  @IsOptional()
  @MaxLength(20)
  description?: string

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  done?: boolean
}