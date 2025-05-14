import React, { useState, useEffect } from "react";
import useTodoStore from "../../../store/todoStore";
import "./TodoList.css";

const TodoUpdateModal = ({ isOpen, onClose, todo, userId }) => {
  const { error, fetching } = useTodoStore();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    // dueDate: "",
    // priority: "medium",
  });

  // Populate form with todo data when modal opens
  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title || "",
        description: todo.description || "",
        // dueDate: todo.dueDate
        //   ? new Date(todo.dueDate).toISOString().split("T")[0]
        //   : "",
        // priority: todo.priority || "medium",
      });
    }
  }, [todo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Access the updateTodo function directly from the store
    console.log(
      "UserId: ",
      userId,
      " TodoId: ",
      todo._id,
      " FormData: ",
      formData
    );
    console.log(await useTodoStore.getState());
    await useTodoStore.getState().updateTodo(userId, todo._id, formData);
    // Check error from the store's current state
    if (!useTodoStore.getState().error) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Update Todo</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="todo-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="todo-input"
                value={formData.title}
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
                value={formData.description}
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
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                className="todo-input"
                value={formData.priority}
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
              {fetching ? "Updating..." : "Update Todo"}
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={fetching}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoUpdateModal;
