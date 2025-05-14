// import React, { useState, useEffect } from "react";
// import useTodoStore from "../../../store/todoStore";
// import "./TodoList.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPlus,
//   faClock,
//   faClose,
//   faCancel,
//   faTrash,
//   faEdit,
// } from "@fortawesome/free-solid-svg-icons";

// const TodoList = () => {
//   const [userId, setUserId] = useState("");
//   const [showForm, setShowForm] = useState(false);

//   // Fetch username from localStorage only on initial render
//   useEffect(() => {
//     const authData = localStorage.getItem("auth-storage");
//     if (authData) {
//       const parsedData = JSON.parse(authData);
//       setUserId(parsedData.state.user?._id || "");
//     }
//   }, []);

//   // Access state and actions from the Zustand store
//   const {
//     todos,
//     fetching,
//     error,
//     fetchTodos,
//     createTodo,
//     updateTodo,
//     deleteTodo,
//   } = useTodoStore();

//   // Local state for form inputs
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   // Fetch todos when userId updates
//   useEffect(() => {
//     if (userId) {
//       fetchTodos(userId);
//     }
//   }, [userId, fetchTodos]);

//   // Handler to add a new todo
//   const handleAddTodo = async (e) => {
//     e.preventDefault();
//     if (!title.trim()) return;

//     try {
//       await createTodo(userId, { title, description });
//       setTitle("");
//       setDescription("");
//       setShowForm(false); // Close form after submission
//     } catch (err) {
//       console.error("Error creating todo:", err);
//     }
//   };

//   // Handler to update a todo
//   const handleUpdateTodo = async () => {};

//   // Handler to delete a todo
//   const handleDeleteTodo = async (todoId) => {
//     try {
//       await deleteTodo(userId, todoId);
//     } catch (err) {
//       console.error("Error deleting todo:", err);
//     }
//   };

//   // Toggle form visibility
//   const toggleForm = () => {
//     setShowForm(!showForm);
//   };

//   return (
//     <div className="todo-container">
//       <div className="todo-header">
//         <h1 className="todo-title">Todos</h1>
//         <button className="create-todo-btn" onClick={toggleForm}>
//           {showForm ? (
//             <>
//               <FontAwesomeIcon icon={faCancel} className="button-icon-cancel" />
//               <span>Cancel</span>
//             </>
//           ) : (
//             <>
//               <FontAwesomeIcon icon={faPlus} className="button-icon" />
//               <span>Create Todo</span>
//             </>
//           )}
//         </button>
//       </div>

//       {fetching && (
//         <div className="loading-overlay">
//           <div className="loading-spinner"></div>
//         </div>
//       )}
//       {error && <div className="error-message">{error}</div>}

//       {/* Collapsible form for adding a new todo */}
//       <div className={`todo-form-container ${showForm ? "show" : ""}`}>
//         <form onSubmit={handleAddTodo} className="todo-form">
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="todo-title">Task Title</label>
//               <input
//                 id="todo-title"
//                 type="text"
//                 placeholder="Enter task title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//                 className="todo-input"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="todo-description">Description</label>
//               <textarea
//                 id="todo-description"
//                 placeholder="Add details (optional)"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="todo-textarea"
//               />
//             </div>
//           </div>

//           <div className="form-actions">
//             <button type="submit" className="submit-btn">
//               Add Task
//             </button>
//             <button
//               type="button"
//               className="cancel-btn"
//               onClick={() => setShowForm(false)}
//             >
//               <FontAwesomeIcon icon={faClose} className="button-icon" />
//               Close
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Table of todos */}
//       <div className="todo-table-container">
//         {todos.length === 0 && !fetching ? (
//           <div className="empty-state">
//             <span className="empty-icon">📋</span>
//             <p>No tasks yet. Create your first one!</p>
//           </div>
//         ) : (
//           <table className="todo-table">
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Description</th>
//                 {/* <th>Status</th>
//                 <th>Priority</th> */}
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {todos.map((todo, index) => (
//                 <tr key={index} className="todo-row">
//                   <td className="todo-cell title-cell">{todo.title}</td>
//                   <td className="todo-cell description-cell">
//                     {todo.description || (
//                       <span className="no-description">—</span>
//                     )}
//                   </td>
//                   <td className="todo-cell action-cell">
//                     <button className="edit-btn" aria-label="Edit Task">
//                       <FontAwesomeIcon icon={faEdit} />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteTodo(todo._id || todo.id)}
//                       className="delete-btn"
//                       aria-label="Delete task"
//                     >
//                       <FontAwesomeIcon icon={faTrash} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TodoList;

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPlus,
//   faClock,
//   faClose,
//   faCancel,
//   faTrash,
//   faEdit,
// } from "@fortawesome/free-solid-svg-icons";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlusSquare,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import useTodoStore from "../../../store/todoStore";
import TodoUpdateModal from "./TodoUpdateModal";
import "./TodoList.css";
import useAuthStore from "../../../store/authStore";

const TodoList = () => {
  const userId = useAuthStore((state) => state.user._id);
  const {
    todos,
    fetchTodos,
    deleteTodo,
    toggleTodoCompletion,
    error,
    fetching,
  } = useTodoStore();
  const [showForm, setShowForm] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    // dueDate: "",
    // priority: "medium",
  });
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchTodos(userId);
    }
  }, [userId, fetchTodos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await useTodoStore.getState().createTodo(userId, newTodo);
    setNewTodo({
      title: "",
      description: "",
      // dueDate: "",
      // priority: "medium",
    });
    setShowForm(false);
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleUpdateTodo = (todo) => {
    setSelectedTodo(todo);
    setUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedTodo(null);
  };

  const handleDeleteTodo = async (todoId) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      await deleteTodo(userId, todoId);
    }
  };

  const handleToggleCompletion = async (todoId) => {
    await toggleTodoCompletion(userId, todoId);
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h2 className="todo-title">My Todo List</h2>
        <button className="create-todo-btn" onClick={handleToggleForm}>
          <FontAwesomeIcon icon={faPlusSquare} style={{ marginRight: "6px" }} />{" "}
          {showForm ? "Cancel" : "Create Todo"}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className={`todo-form-container ${showForm ? "show" : ""}`}>
        <form className="todo-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="todo-input"
                value={newTodo.title}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className="todo-textarea"
                value={newTodo.description}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* <div className="form-row">
            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                className="todo-input"
                value={newTodo.dueDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                className="todo-input"
                value={newTodo.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div> */}

          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={fetching}>
              {fetching ? "Creating..." : "Create Todo"}
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={handleToggleForm}
              disabled={fetching}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {fetching && !showForm ? (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      ) : todos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No todos yet</h3>
          <p>Create your first todo to get started</p>
        </div>
      ) : (
        <div className="todo-table-container">
          <table className="todo-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                {/* <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo._id} className="todo-row">
                  <td className="todo-cell title-cell">{todo.title}</td>
                  <td className="todo-cell description-cell">
                    {todo.description || (
                      <span className="no-description">No description</span>
                    )}
                  </td>
                  {/* <td className="todo-cell">
                    {todo.dueDate
                      ? new Date(todo.dueDate).toLocaleDateString()
                      : "No date"}
                  </td>
                  <td className="todo-cell">
                    <span className={`priority-badge ${todo.priority}`}>
                      {todo.priority}
                    </span>
                  </td>
                  <td className="todo-cell">
                    <label className="status-toggle">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggleCompletion(todo._id)}
                      />
                      <span className="toggle-slider"></span>
                      <span className="status-text">
                        {todo.completed ? "Completed" : "Pending"}
                      </span>
                    </label>
                  </td> */}
                  <td className="todo-cell action-cell">
                    <button
                      className="edit-btn"
                      onClick={() => handleUpdateTodo(todo)}
                      title="Edit Todo"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteTodo(todo._id)}
                      title="Delete Todo"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      <TodoUpdateModal
        isOpen={updateModalOpen}
        onClose={closeUpdateModal}
        todo={selectedTodo}
        userId={userId}
      />
    </div>
  );
};

export default TodoList;
