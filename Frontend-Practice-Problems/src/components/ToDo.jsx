import React, { useState, useRef } from "react";
import './ToDo.scss'
function ToDo() {
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const liveRegionRef = useRef(null);

  const addTodo = (e) => {
    const value = input.trim();
    if (value && (e.key === "Enter" || e.key === "Tab")) {
      setTodoList((prev) => [...prev, value]);
      setAnnouncement(`Task "${value}" added`);
      setInput("");
    }
  };

  const deleteTodo = (id) => {
    const item = todoList.filter((_, index) => index === id)
    setTodoList((prev) => prev.filter((_, index) => index !== id));
    setAnnouncement(`Task "${item}" deleted`);
  };

  return (
    <div>
      <h1>To Do List</h1>
      <label htmlFor="todo-input" className="visually-hidden">
        Add a task
      </label>
      <input
        type="text"
        placeholder="Add Your Task"
        className="todo-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={addTodo}
        aria-label="Task input"
        id="todo-input"
      />

      {/* Accessibility */}
      <div
        role="status"
        aria-live="polite"
        className="visually-hidden"
        ref={liveRegionRef}
      >
        {announcement}
      </div>

      {todoList.length > 0 && (
        <ul aria-label="To-Do Items" className="todo-list">
          {todoList.map((value, index) => {
            return (
              <li key={index} className="todo-item">
                {value}
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(index)}
                  aria-label={`Delete task ${index + 1}`}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ToDo;
