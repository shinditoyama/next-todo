import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface TodoState {
  todos: ITodo[];
  addTodo: (todo: ITodo) => void;
  deleteTodo: (todoId: string) => void;
  toggleTodo: (todoId: string) => void;
  clear: () => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (todo: ITodo) => {
        set((state) => ({ todos: [...state.todos, todo] }));
      },
      deleteTodo: (todoId: string) => {
        set((state) => ({
          todos: state.todos.filter((v) => v.id !== todoId),
        }));
      },
      toggleTodo: (todoId: string) => {
        set((state) => ({
          todos: state.todos.map((item) => {
            if (item.id === todoId) {
              item.completed = !item.completed;
            }
            return item;
          }),
        }));
      },
      clear: () => set({ todos: [] }),
    }),
    {
      name: "todo-list",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
