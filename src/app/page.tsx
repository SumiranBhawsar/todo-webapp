// import AllTodos from "@/compnents/AllTodos";
// import AddTodo from "../compnents/AddTodo";

import TodoPage from "@/compnents/TodoPage";

export default function Home() {
  return (
    <>
      <div className="h-screen overflow-hidden w-full flex flex-col p-20 py-4 mx-auto items-center gap-4 text-white bg-black">
        {/* <AddTodo />
        <AllTodos /> */}
        <TodoPage />
      </div>
    </>
  );
}
