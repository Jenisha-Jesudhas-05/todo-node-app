import { IncomingMessage, ServerResponse } from "http";
import * as todoService from "../services/todo.service";

export const getBody = (req: IncomingMessage): Promise<any> => {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      resolve(body ? JSON.parse(body) : {});
    });
  });
};

export const getAll = async (_req: IncomingMessage, res: ServerResponse) => {
  const todos = await todoService.getAllTodos();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(todos));
};

export const create = async (req: IncomingMessage, res: ServerResponse) => {
  const body = await getBody(req);
  const todo = await todoService.createTodo(body);

  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify(todo));
};

export const getById = async (
  _req: IncomingMessage,
  res: ServerResponse,
  id: number
) => {
  const todo = await todoService.getTodoById(id);

  if (!todo) {
    res.writeHead(404);
    return res.end("Not found");
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(todo));
};

export const update = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: number
) => {
  const body = await getBody(req);
  const todo = await todoService.updateTodo(id, body);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(todo));
};

export const remove = async (
  _req: IncomingMessage,
  res: ServerResponse,
  id: number
) => {
  await todoService.deleteTodo(id);
  res.writeHead(200);
  res.end("Deleted");
};