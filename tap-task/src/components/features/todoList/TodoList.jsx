import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import "./TodoList.css"; // Import the CSS file

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Complete project proposal", completed: false },
    { id: 2, text: "Review design mockups", completed: true },
    { id: 3, text: "Prepare presentation slides", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");

  // Add a new task
  const addTask = () => {
    if (newTask.trim() === "") return; // Prevent empty tasks
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  // Toggle task completion
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="todo-list">
      <h1 className="todo-title">To-Do List</h1>

      {/* Add Task Input */}
      <div className="add-task">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="add-task-button" onClick={addTask}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      {/* Task List */}
      <ul className="tasks">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task ${task.completed ? "completed" : ""}`}
          >
            <span className="task-text">{task.text}</span>
            <div className="task-actions">
              <button
                className="task-action complete"
                onClick={() => toggleTaskCompletion(task.id)}
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button
                className="task-action delete"
                onClick={() => deleteTask(task.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
