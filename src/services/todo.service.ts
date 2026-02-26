import Todo from "../models/todo.model";
import { ITodo } from "../types/todo.types";

export const createTodo = async (data: ITodo) => {
  return await Todo.create(data);
};

export const getAllTodos = async () => {
  return await Todo.find();
};

export const getTodoById = async (id: number) => {
  return await Todo.findOne({ id });
};

export const updateTodo = async (id: number, data: Partial<ITodo>) => {
  return await Todo.findOneAndUpdate({ id }, data, { new: true });
};

export const deleteTodo = async (id: number) => {
  return await Todo.findOneAndDelete({ id });
};