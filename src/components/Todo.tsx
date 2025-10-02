import TodoItems from "./TodoItems";
import { useEffect, useRef, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { motion, AnimatePresence, type Variants } from "framer-motion";

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
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);
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
    setIsConfirmingClear(true);
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    inputRef.current?.focus();
  }, [todoList]);

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-white mx-auto my-auto w-11/12 max-w-[500px]
  flex flex-col p-7 min-h-[550px] rounded-4xl text-black"
    >
      <motion.div
        variants={childVariants}
        className="relative flex items-center justify-center mt-7 gap-2"
      >
        {/* <HistoryEduRoundedIcon className=" mt-2 font-semibold" /> */}
        <h1 className="text-4xl font-bold text-neutral-800">Quests</h1>
        <AnimatePresence>
          {todoList.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-0 w-14 h-full grid place-items-center"
            >
              <CancelIcon
                onClick={clearTodo}
                className="cursor-pointer text-2xl text-neutral-600 duration-300 ease-in-out hover:text-red-400"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* input field */}
      <motion.div
        variants={childVariants}
        className="flex items-center my-7 gap-2"
      >
          <input
            ref={inputRef}
            className="bg-gray-200 border-0 outline-none flex-1 h-14 pl-6 pr-2
                 placeholder:text-slate-600 rounded-full"
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
            className="peer grid place-items-center shrink-0 w-14 h-14 rounded-full bg-neutral-800
                 text-white text-3xl font-light cursor-pointer
                 duration-200 ease-in-out hover:bg-neutral-700"
          >
            +
          </button>
      </motion.div>

      {/* todo items */}
      <motion.div
        variants={childVariants}
        className="flex flex-col mt-4"
      >
        <AnimatePresence>
          {todoList.map((item) => (
            <TodoItems
              key={item.id}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggleComplete={toggleComplete}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {isConfirmingClear && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-8 rounded-2xl shadow-lg text-center w-11/12 max-w-sm"
            >
              <h2 className="text-2xl font-bold mb-4 text-neutral-800">
                Clear All Quests?
              </h2>
              <p className="text-neutral-600 mb-8">
                This action cannot be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setTodoList([]);
                    setIsConfirmingClear(false);
                  }}
                  className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 duration-200 font-semibold"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setIsConfirmingClear(false)}
                  className="bg-gray-200 text-neutral-800 px-6 py-2 rounded-full hover:bg-gray-300 duration-200 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Todo;
