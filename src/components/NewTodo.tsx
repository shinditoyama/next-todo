import { useTodoStore } from "@/store/todo";
import { FormEvent, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

interface Props {
  tasksLength: number;
  tasksDoneLength: number;
}

export default function NewTodo({ tasksLength, tasksDoneLength }: Props) {
  const description = useRef<HTMLInputElement | null>(null);

  const { addTodo, clear } = useTodoStore();

  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault();
    if (!description.current?.value) return;
    addTodo({
      id: uuidv4(),
      description: description.current.value,
      completed: false,
      createdAt: new Date().toISOString(),
    });
    description.current.value = "";
  };

  return (
    <form onSubmit={handleAddTodo}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center justify-center gap-2">
          Tarefas criadas:
          <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {tasksLength}
          </span>
        </div>
        <div className="flex items-center justify-center gap-2">
          Concluídas:
          <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {tasksLength !== 0 ? `${tasksDoneLength} de ${tasksLength}` : "0"}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <input
          ref={description}
          className="shadow appearance-none border rounded w-full px-3"
          placeholder="Add Todo..."
          required
        />
        <button
          type="submit"
          className="p-2 border-2 rounded text-teal-600 border-teal-600 hover:text-white hover:bg-teal-600"
        >
          ADD
        </button>
        {tasksLength !== 0 && (
          <button
            type="button"
            className="p-2 border-2 rounded text-red-600 border-red-600 hover:text-white hover:bg-red-600"
            onClick={() => clear()}
          >
            DELETE
          </button>
        )}
      </div>
    </form>
  );
}
