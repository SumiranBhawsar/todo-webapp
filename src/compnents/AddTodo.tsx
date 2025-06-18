// components/AddTodo.tsx
"use client";

import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "@/lib/features/todo/todoSlice";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addTodo({ title, content }));
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 rounded bg-gray-800 text-white placeholder-gray-400"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400"
      />
      <button
        type="submit"
        className="mt-2 bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 rounded-full text-white font-semibold"
      >
        + Add Todo
      </button>
    </form>
  );
}
