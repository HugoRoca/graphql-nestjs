import { Float, Query, Resolver, Int, Args } from "@nestjs/graphql";

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, { name: "hello", description: "A simple hello world query"})
  helloWorld(): string {
    return 'Hello, world!';
  }

  @Query(() => Float, { name: "random", description: "A simple random number query"})
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, { name: "randomFromZeroTo", description: "From zero to argument to (default 6)" })
  getRandomFromZeroTo(
    @Args("to", {
      type: () => Int, // For valid argument type
      nullable: true, // For optional argument
    }) to: number = 6): number {
    return Math.floor(Math.random() * to);
  }
}
