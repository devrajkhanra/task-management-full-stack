import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTodoStore = create(
  persist(
    (set, get) => ({
      todos: [],
      fetching: false,
      error: null,

      // Fetch all todos for a specific user
      fetchTodos: async (userId) => {
        set({ fetching: true, error: null });
        try {
          const res = await fetch(
            `http://localhost:3000/api/todos/user/${userId}`,
            {
              credentials: "include", // Ensures authentication cookies are sent
            }
          );
          if (!res.ok) {
            throw new Error("Failed to fetch todos");
          }
          const data = await res.json();
          set({ todos: data, fetching: false });
        } catch (err) {
          set({ error: err.message, fetching: false });
        }
      },

      // Create a new todo for a given user
      createTodo: async (userId, todoData) => {
        set({ fetching: true, error: null });
        try {
          const res = await fetch(
            `http://localhost:3000/api/todos/user/${userId}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify(todoData),
            }
          );
          if (!res.ok) {
            throw new Error("Unable to create todo");
          }
          const createdTodo = await res.json();
          set((state) => ({
            todos: [...state.todos, createdTodo],
            fetching: false,
          }));
        } catch (err) {
          set({ error: err.message, fetching: false });
        }
      },

      // Update an existing todo
      updateTodo: async (userId, todoId, updatedFields) => {
        set({ fetching: true, error: null });
        try {
          const res = await fetch(
            `http://localhost:3000/api/todos/user/${userId}/${todoId}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify(updatedFields),
            }
          );
          if (!res.ok) {
            throw new Error("Unable to update todo");
          }
          const updatedTodo = await res.json();
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo._id === updatedTodo._id ? updatedTodo : todo
            ),
            fetching: false,
          }));
        } catch (err) {
          set({ error: err.message, fetching: false });
        }
      },

      // Delete a todo
      deleteTodo: async (userId, todoId) => {
        set({ fetching: true, error: null });
        try {
          const res = await fetch(
            `http://localhost:3000/api/todos/user/${userId}/${todoId}`,
            {
              method: "DELETE",
              credentials: "include",
            }
          );
          if (!res.ok) {
            throw new Error("Unable to delete todo");
          }
          set((state) => ({
            todos: state.todos.filter((todo) => todo._id !== todoId),
            fetching: false,
          }));
        } catch (err) {
          set({ error: err.message, fetching: false });
        }
      },

      // Toggle todo completion status
      toggleTodoCompletion: async (userId, todoId) => {
        set({ fetching: true, error: null });
        try {
          const res = await fetch(
            `http://localhost:3000/api/todos/user/${userId}/${todoId}/toggle`,
            {
              method: "PATCH",
              credentials: "include",
            }
          );
          if (!res.ok) {
            throw new Error("Unable to toggle todo");
          }
          const updatedTodo = await res.json();
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo._id === updatedTodo._id ? updatedTodo : todo
            ),
            fetching: false,
          }));
        } catch (err) {
          set({ error: err.message, fetching: false });
        }
      },

      // Local reset function (useful on logout or clearing state)
      clearTodos: () => set({ todos: [] }),
    }),
    {
      name: "todo-storage", // LocalStorage persistence
    }
  )
);

export default useTodoStore;
