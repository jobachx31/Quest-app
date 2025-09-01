import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import RadioButtonCheckedRoundedIcon from "@mui/icons-material/RadioButtonCheckedRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

interface TodoListProps {
  text: string;
  id: number;
  isComplete: boolean;
  deleteTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
}

const TodoItems = (Props: TodoListProps) => {
  return (
    <div
      className="flex items-center my-3 gap-2"
      onClick={() => {
        Props.toggleComplete(Props.id);
      }}
    >
      <div className="flex flex-1 items-center cursor-pointer">
        {Props.isComplete === true ? (
          <RadioButtonCheckedRoundedIcon className="w-7 text-neutral-400" />
        ) : (
          <RadioButtonUncheckedRoundedIcon className="w-7 text-neutral-800" />
        )}
        <p
          className={
            Props.isComplete === true
              ? "ml-4 text-neutral-400 font-medium text-lg"
              : "ml-4 text-neutral-800 font-medium text-lg"
          }
        >
          {Props.text}
        </p>
      </div>

      <div className="w-3.5">
        <DeleteRoundedIcon
          className="cursor-pointer w-3.5"
          onClick={() => {
            Props.deleteTodo(Props.id);
          }}
        />
      </div>
    </div>
  );
};

export default TodoItems;
