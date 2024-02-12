import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { StatusArgs } from "./dto/args/status.args";

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Descripction 1', done: true },
    { id: 2, description: 'Descripction 2', done: false },
    { id: 3, description: 'Descripction 3', done: true },
    { id: 4, description: 'Descripction 4', done: false }
  ]

  get TotalTodos(): number {
    return this.todos.length
  }

  get PendingTodos(): number {
    return this.todos.filter(x => !x.done).length
  }

  get CompletedTodos(): number {
    return this.todos.filter(x => x.done).length
  }

  findAll(statusArgs: StatusArgs): Todo[] {
    const { status } = statusArgs;

    if (status !== undefined) {
      return this.todos.filter(x => x.done === status)
    }

    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find(x => x.id === id)

    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`)

    return todo;
  }

  createTodo(input: CreateTodoInput): Todo {
    const todo = new Todo()
    todo.description = input.description
    todo.id = Math.max(...this.todos.map(x => x.id), 0) + 1

    this.todos.push(todo)

    return todo;
  }

  updateTodo(input: UpdateTodoInput): Todo {
    const { id, description, done } = input
    const todo = this.findOne(input.id);

    if (!todo) throw new NotFoundException(`Todo with id ${input.id} not found`)

    if (input.description) todo.description = description
    if (input.done !== undefined) todo.done = done

    this.todos = this.todos.map( x => {
      return (x.id === id) ? todo : x;
    })

    return todo;
  }

  deleteTodo(id: number): Boolean {
    const todo = this.findOne(id);

    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`)

    this.todos = this.todos.filter(x => x.id !== id)

    return true;
  }
}
