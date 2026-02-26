import { IncomingMessage, ServerResponse } from "http";
import * as controller from "./controller/todo.controller"; 

export const router = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const url = req.url || "";
  const method = req.method || "";

  if (url === "/") {
    res.writeHead(200);
    return res.end("Todo Node API Running check /api/todos");
  }

  if (url === "/api/todos" && method === "GET") {
    return controller.getAll(req, res);
  }

  if (url === "/api/todos" && method === "POST") {
    return controller.create(req, res);
  }

  const match = url.match(/^\/api\/todos\/(\d+)$/);
  if (match) {
    const id = Number(match[1]);

    if (method === "GET") return controller.getById(req, res, id);
    if (method === "PUT") return controller.update(req, res, id);
    if (method === "DELETE") return controller.remove(req, res, id);
  }

  res.writeHead(404);
  res.end("Route Not Found");
};