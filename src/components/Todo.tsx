import HistoryEduRoundedIcon from "@mui/icons-material/HistoryEduRounded";
import TodoItems from "./TodoItems";
import { useEffect, useRef, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

const Todo = () => {
  interface Todo {
    id: number;
    text: string;
    isComplete: boolean;
  }

  const [todoList, setTodoList] = useState<Todo[]>(
    localStorage.getItem("todoList")
      ? JSON.parse(localStorage.getItem("todoList")!)
      : []
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const addTodo = () => {
    const inputText = inputRef.current?.value.trim() ?? "";
    if (inputText === "") return;
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current!.value = "";
    console.log(todoList);
  };
  const deleteTodo = (id: number) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };
  const toggleComplete = (id: number) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };
  const clearTodo = () => {
    confirm("Are you sure you want to clear all quests?") && setTodoList([]);
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    inputRef.current?.focus();
  }, [todoList]);

  return (
    <div
      className="bg-white place-self-center w-11/12 sm:w-[20rem] md:w-[30rem] lg:w-[40rem]
  flex flex-col p-7 min-h-[550px] rounded-2xl text-black"
    >
      <div className="flex items-center mt-7 gap-2">
        <HistoryEduRoundedIcon className=" mt-2 font-semibold" />
        <h1 className="text-4xl font-bold text-neutral-800">Quests</h1>
        <CancelIcon
          onClick={() => {
            clearTodo();
          }}
          className={
            todoList.length > 0
              ? "ml-auto cursor-pointer text-red-400"
              : "ml-auto cursor-pointer text-red-400 invisible"
          }
        />
      </div>

      {/* input field */}
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2
             placeholder:text-slate-600"
          type="text"
          placeholder="Add a Quest..."
          onKeyDown={(e) => {
            e.key === "Enter" && addTodo();
          }}
        />
        <button
          onClick={() => {
            addTodo();
            inputRef.current?.focus();
          }}
          className="border-none rounded-full bg-range-600 w-32 h-14
             text-white text-l font-medium cursor-pointer bg-neutral-800"
        >
          Add
        </button>
      </div>

      {/* todo items */}
      <div className="flex flex-col mt-4">
        {todoList.map((item, index) => (
          <TodoItems
            key={index}
            text={item.text}
            id={item.id}
            isComplete={item.isComplete}
            deleteTodo={deleteTodo}
            toggleComplete={toggleComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
