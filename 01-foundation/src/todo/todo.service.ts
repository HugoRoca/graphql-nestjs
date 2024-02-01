import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Todo 1', done: false },
    { id: 2, description: 'Todo 2', done: true },
    { id: 3, description: 'Todo 3', done: false },
    { id: 4, description: 'Todo 4', done: true }
  ];

  create(createTodoDto: CreateTodoDto): Todo {
    const todo = new Todo();
    todo.id = Math.max(...this.todos.map(todo => todo.id), 0) + 1;
    todo.description = createTodoDto.description;

    this.todos.push(todo);

    return todo
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find(todo => todo.id === id);

    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);

    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = this.findOne(id);
    const { done, description } = updateTodoDto;

    if (done !== undefined) todo.done = done;
    if (description) todo.description = description;

    this.todos.map(t => t.id === id ? todo : t);

    return todo;
  }

  remove(id: number) {
    const todo = this.findOne(id);

    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);

    this.todos = this.todos.filter(todo => todo.id !== id);

    return todo;
  }
}
