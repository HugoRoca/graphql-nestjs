import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';

@Resolver()
export class TodoResolver {
  constructor(
    private readonly todoService: TodoService
  ) {}

  @Query(() => [Todo], { "name": "todos", description: "For get all todo" })
  findAll(): Todo[] {
    return this.todoService.findAll()
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
}
