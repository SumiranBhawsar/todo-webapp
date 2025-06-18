// components/AllTodos.tsx
"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { RootState } from "@/lib/store/store";
import { removeTodo, updateTodo, todo } from "@/lib/features/todo/todoSlice";

export default function AllTodos() {
  const todos = useSelector((state: RootState) => state.todoReducer.todos);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<todo | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "" });

  const openModal = (todo: todo) => {
    setSelectedTodo(todo);
    setFormData({ title: todo.title, content: todo.content });
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedTodo) return;
    dispatch(updateTodo({
      ...selectedTodo,
      title: formData.title,
      content: formData.content,
    }));
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 rounded-lg flex flex-col shadow"
        >
          <div className="flex items-center justify-between">
            <h2 className={`text-lg font-bold ${todo.isDone ? 'line-through text-gray-400' : ''}`}>{todo.title}</h2>
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={() =>
                dispatch(updateTodo({ ...todo, isDone: !todo.isDone }))
              }
              className="w-5 h-5 accent-green-500"
            />
          </div>
          <p className="text-sm text-gray-300 mt-2">{todo.content}</p>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => openModal(todo)}
              className="px-4 py-1 text-sm rounded bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => dispatch(removeTodo(todo))}
              className="px-4 py-1 text-sm rounded bg-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {isModalOpen && selectedTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-slate-900 p-6 rounded-xl shadow w-[90%] max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Edit Todo</h2>

            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Title"
              className="w-full p-2 mb-3 border rounded bg-gray-800 text-white"
            />

            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Content"
              className="w-full border border-gray-700 px-4 py-2 rounded mb-4 bg-gray-800 text-white"
              rows={3}
            />

            <label className="block text-sm mb-1 font-medium">Status</label>
            <select
              value={selectedTodo.isDone ? "Completed" : "Pending"}
              onChange={(e) =>
                setSelectedTodo({ ...selectedTodo, isDone: e.target.value === "Completed" })
              }
              className="w-full p-2 mb-4 rounded bg-white text-black"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 px-4 py-2 rounded text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-600 px-4 py-2 rounded text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
