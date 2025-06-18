"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { addTodo, removeTodo, updateTodo, todo } from "@/lib/features/todo/todoSlice";

export default function TodoPage() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todoReducer.todos);

  const [formData, setFormData] = useState({ title: "", content: "" });
  const [editFormData, setEditFormData] = useState({ title: "", content: "" });
  const [selectedTodo, setSelectedTodo] = useState<todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = () => {
    dispatch(addTodo(formData));
    setFormData({ title: "", content: "" });
  };

  const handleUpdate = () => {
    if (!selectedTodo) return;

    dispatch(
      updateTodo({
        ...selectedTodo,
        title: editFormData.title,
        content: editFormData.content,
      })
    );

    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  const handleCancelEdit = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
    setEditFormData({ title: "", content: "" });
  };

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 mb-2 rounded bg-gray-800 text-white placeholder-gray-400"
        />
        <textarea
          placeholder="Content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400"
        />
        <button
          onClick={handleAdd}
          className="mt-2 bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 rounded-full text-white font-semibold"
        >
          + Add Todo
        </button>
      </div>

      <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2 [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden">
        {todos.map((todoItem) => (
          <div
            key={todoItem.id}
            className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 rounded-lg flex flex-col shadow"
          >
            <div className="flex items-center justify-between">
              <h2
                className={`text-lg font-bold ${todoItem.isDone ? "line-through text-gray-400" : ""}`}
              >
                {todoItem.title}
              </h2>
              <input
                type="checkbox"
                checked={todoItem.isDone}
                onChange={() =>
                  dispatch(
                    updateTodo({ ...todoItem, isDone: !todoItem.isDone })
                  )
                }
                className="w-5 h-5 accent-green-500"
              />
            </div>
            <p className="text-sm text-gray-300 mt-2">{todoItem.content}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  setSelectedTodo(todoItem);
                  setEditFormData({ title: todoItem.title, content: todoItem.content });
                  setIsModalOpen(true);
                }}
                className="px-4 py-1 text-sm rounded bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(removeTodo(todoItem))}
                className="px-4 py-1 text-sm rounded bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-slate-900 p-6 rounded-xl shadow w-[90%] max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Edit Todo</h2>

            <input
              type="text"
              value={editFormData.title}
              onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
              placeholder="Title"
              className="w-full p-2 mb-3 border rounded bg-gray-800 text-white"
            />

            <textarea
              value={editFormData.content}
              onChange={(e) => setEditFormData({ ...editFormData, content: e.target.value })}
              placeholder="Content"
              className="w-full border border-gray-700 px-4 py-2 rounded mb-4 bg-gray-800 text-white"
              rows={3}
            />

            <label className="block text-sm mb-1 font-medium">Status</label>
            <select
              value={selectedTodo.isDone ? "Completed" : "Pending"}
              onChange={(e) => {
                const isDone = e.target.value === "Completed";
                setSelectedTodo({ ...selectedTodo, isDone });
              }}
              className="w-full p-2 mb-4 rounded bg-white text-black"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancelEdit}
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
    </main>
  );
}
