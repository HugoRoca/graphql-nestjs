import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto'
import { AggregationsType } from "./types/aggregations.type";

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

  // aggregations
  @Query(() => Int, { name: "countTodos", description: "For count all todo" })
  completeTodos(): number {
    return this.todoService.TotalTodos
  }

  @Query(() => Int, { name: "countPendingTodos", description: "For count pending todo" })
  countPendingTodos(): number {
    return this.todoService.PendingTodos
  }

  @Query(() => Int, { name: "countCompletedTodos", description: "For count completed todo" })
  countCompletedTodos(): number {
    return this.todoService.CompletedTodos
  }

  @Query(() => AggregationsType, { name: "aggregations", description: "For get aggregations" })
  aggregations(): AggregationsType {
    return {
      total: this.todoService.TotalTodos,
      pending: this.todoService.PendingTodos,
      completed: this.todoService.CompletedTodos,
      totalCompleted: this.todoService.CompletedTodos
    }
  }
}
