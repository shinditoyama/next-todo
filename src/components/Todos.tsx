import { useTodoStore } from "@/store/todo";
import { TrashIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";

interface Props {
  todo: ITodo;
}

export default function Todos({ todo }: Props) {
  const { deleteTodo, toggleTodo } = useTodoStore();

  return (
    <div className="flex mb-4 px-2 items-center hover:bg-gray-100">
      <input
        id={`checkbox-${todo.id}`}
        type="checkbox"
        className="mr-2"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <label
        htmlFor={`checkbox-${todo.id}`}
        className={`w-full ${todo.completed && "line-through text-gray-400"}`}
      >
        <p className="text-lg">{todo.description}</p>
        <p className="text-xs">
          {format(new Date(todo.createdAt), "dd/MM/yyyy - HH':'mm':'ss")}
        </p>
      </label>
      <button onClick={() => deleteTodo(todo.id)}>
        <TrashIcon className="h-5 w-5 text-red-500 hover:text-red-700" />
      </button>
    </div>
  );
}
