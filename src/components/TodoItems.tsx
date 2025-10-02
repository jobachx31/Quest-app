import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import RadioButtonCheckedRoundedIcon from "@mui/icons-material/RadioButtonCheckedRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { motion } from "framer-motion";

interface TodoListProps {
  text: string;
  id: number;
  isComplete: boolean;
  deleteTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
}

const TodoItems = (Props: TodoListProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
      layout
      className="group flex items-center my-3 gap-2"
    >
      <div
        className="flex flex-1 items-center cursor-pointer"
        onClick={() => {
          Props.toggleComplete(Props.id);
        }}
      >
        {Props.isComplete === true ? (
          <RadioButtonCheckedRoundedIcon className="w-7 text-neutral-400" />
        ) : (
          <RadioButtonUncheckedRoundedIcon className="w-7 text-neutral-800" />
        )}
        <p
          className={`ml-4 font-medium text-lg transition-colors duration-200 ${
            Props.isComplete
              ? "text-neutral-400 line-through"
              : "text-neutral-800"
          }`}
        >
          {Props.text}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-14 h-full flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <DeleteRoundedIcon
          className="cursor-pointer text-xl duration-300 ease-in-out hover:text-red-400"
          onClick={() => Props.deleteTodo(Props.id)}
        />
      </motion.div>
    </motion.div>
  );
};

export default TodoItems;
