import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto'

@Resolver(() => Todo)
export class TodoResolver {
  constructor(
    private readonly todoService: TodoService
  ) {}

  @Query(() => [Todo], { "name": "todos", description: "For get all todo" })
  findAll(
    @Args() statusArgs: StatusArgs
  ): Todo[] {
    return this.todoService.findAll(statusArgs)
  }

  @Query(() => Todo, { name: "todo", description: "For get todo by id"})
  findOne(@Args('id', { type: () => Int }) id: number): Todo {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo, { name: 'createTodo', description: "For create todo"})
  createTodo(
    @Args("createTodoInput") createTodoInput: CreateTodoInput
  ) {
    return this.todoService.createTodo(createTodoInput);
  }

  @Mutation(() => Todo, { name: 'updateTodo', description: "For update todo"})
  updateTodo(
    @Args("updateTodoInput") updateTodoInput: UpdateTodoInput
  ) {
    return this.todoService.updateTodo(updateTodoInput);
  }

  @Mutation(() => Boolean, { name: 'deleteTodo', description: "For delete todo"})
  deleteTodo(
    @Args('id', { type: () => Int }) id: number
  ) {
    return this.todoService.deleteTodo(id);
  }
}
