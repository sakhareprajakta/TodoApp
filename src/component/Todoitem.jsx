import React, { useState } from "react";
import "../index.css";

const Todoitem = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [priority, setPriority] = useState("low");
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);

  // Add Task
  const handleAddTask = () => {
    if (task.trim() === "") return;

    // Edit existing task
    if (editId !== null) {
      const updatedTasks = tasks.map((item) =>
        item.id === editId
          ? { ...item, text: task, priority: priority }
          : item
      );

      setTasks(updatedTasks);
      setEditId(null);
    } else {
      // Add new task
      const newTask = {
        id: Date.now(),
        text: task,
        priority: priority,
        completed: false,
      };

      setTasks([...tasks, newTask]);
    }

    setTask("");
    setPriority("low");
  };

  // Delete Task
  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((item) => item.id !== id);
    setTasks(updatedTasks);
  };

  // Edit Task
  const handleEdit = (item) => {
    setTask(item.text);
    setPriority(item.priority);
    setEditId(item.id);
  };

  // Mark Done
  const handleToggleDone = (id) => {
    const updatedTasks = tasks.map((item) =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    );

    setTasks(updatedTasks);
  };

  // Filter Logic
  const filteredTasks = tasks.filter((item) => {
    if (filter === "active") return !item.completed;
    if (filter === "done") return item.completed;
    if (filter === "high") return item.priority === "high";
    return true;
  });

  return (
    <>
      <div className="title">
        <h1>TODO.EXE</h1>
        <p>// Machine coding challenge CRUD + State Management</p>
      </div>

      <div className="listitem">
        <li>TOTAL: {tasks.length}</li>
        <li>DONE: {tasks.filter((item) => item.completed).length}</li>
        <li>
          PENDING: {tasks.filter((item) => !item.completed).length}
        </li>
      </div>

      <div className="priorityitem">
        <p>PRIORITY</p>
        <button onClick={() => setPriority("high")}>HIGH</button>
        <button onClick={() => setPriority("mid")}>MED</button>
        <button onClick={() => setPriority("low")}>LOW</button>
      </div>

      <div className="inputitem">
        <input
          type="text"
          placeholder="Type a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={handleAddTask}>
          {editId !== null ? "UPDATE" : "ADD"}
        </button>
      </div>

      <div className="filteritem">
        <button onClick={() => setFilter("all")}>ALL</button>
        <button onClick={() => setFilter("active")}>ACTIVE</button>
        <button onClick={() => setFilter("done")}>DONE</button>
        <button onClick={() => setFilter("high")}>HIGH</button>
      </div>

      <div>
        {filteredTasks.map((item) => (
          <div key={item.id} className="taskbox">
            <p>
              {item.completed ? "✅" : "⬜"} {item.text}
              ({item.priority})
            </p>

            <button onClick={() => handleToggleDone(item.id)}>
              {item.completed ? "Undo" : "Done"}
            </button>

            <button onClick={() => handleEdit(item)}>
              Edit
            </button>

            <button onClick={() => handleDelete(item.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="lastitem">
        <p>SHOWING: ACTIVE TASKS</p>
        <button>Clear Done</button>
      </div>
    </>
  );
};

export default Todoitem;