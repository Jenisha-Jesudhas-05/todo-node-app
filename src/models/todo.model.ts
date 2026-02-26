import mongoose, { Schema, Document } from "mongoose";
import { ITodo } from "../types/todo.types";

export interface ITodoDocument extends ITodo, Document {}

const TodoSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: String,
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    status: {
      type: String,
      enum: ["todo", "inProgress", "done", "pending"],
      default: "todo",
    },
    completedPercent: { type: Number, default: null },
    reminded: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<ITodoDocument>("Todo", TodoSchema);