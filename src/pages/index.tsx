import NewTodo from "@/components/NewTodo";
import SEO from "@/components/SEO";
import Todos from "@/components/Todos";
import { useStore } from "@/hooks/useStore";
import { useTodoStore } from "@/store/todo";

export default function Home() {
  const todos = useStore(useTodoStore, (state) => state.todos);

  const tasksLength = todos?.length;
  const numberOfTasksDone = todos?.filter((task) => task.completed === true);

  return (
    <main>
      <SEO title="Todo List" />
      <div className="h-screen w-full px-4 flex flex-col items-center justify-center">
        <div className="text-2xl font-semibold">Todo List</div>
        <div className="w-full bg-white rounded shadow p-6 m-4 h-4/5 lg:max-w-3xl">
          <div className="mb-4">
            <NewTodo
              tasksLength={tasksLength || 0}
              tasksDoneLength={numberOfTasksDone?.length || 0}
            />
          </div>
          <div className="overflow-auto h-[85%] scrollbar-hide">
            {todos
              ?.sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((todo) => (
                <Todos key={todo.id} todo={todo} />
              ))}
            {tasksLength === 0 && (
              <div>Você ainda não tem tarefas cadastradas.</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
