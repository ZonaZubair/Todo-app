import { useState, useEffect } from "react";

// TodoItem component: taking a single todo as prop and renders it
function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 14px",
        background: todo.done ? "#f0fdf4" : "#fff",
        borderRadius: "8px",
        border: "1px solid",
        borderColor: todo.done ? "#bbf7d0" : "#e5e7eb",
        marginBottom: "8px",
      }}
    >
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        style={{ cursor: "pointer", width: "16px", height: "16px" }}
      />

      {/* conditional rendering: strike through if done */}
      <span
        style={{
          flex: 1,
          fontSize: "15px",
          color: todo.done ? "#9ca3af" : "#111827",
          textDecoration: todo.done ? "line-through" : "none",
        }}
      >
        {todo.text}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        style={{
          background: "none",
          border: "none",
          color: "#ef4444",
          cursor: "pointer",
          fontSize: "18px",
          lineHeight: 1,
          padding: "0 4px",
        }}
      >
        x
      </button>
    </div>
  );
}

// main app component
export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | done

  // useEffect: updating the page title based on remaining tasks
  useEffect(() => {
    const remaining = todos.filter((t) => !t.done).length;
    document.title = remaining > 0 ? `(${remaining}) My Todos` : "My Todos";
  }, [todos]);

  function addTodo() {
    if (input.trim() === "") return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input.trim(), done: false },
    ]);
    setInput("");
  }

  function deleteTodo(id) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") addTodo();
  }

  // filter logic
  const visibleTodos = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f9fafb",
        display: "flex",
        justifyContent: "center",
        padding: "48px 16px",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: "480px" }}>

        {/* header */}
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#111827",
            marginBottom: "4px",
          }}
        >
          My Todos
        </h1>

        {/* conditional rendering: show count only if there are todos */}
        {todos.length > 0 && (
          <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "20px" }}>
            {remaining} task{remaining !== 1 ? "s" : ""} left
          </p>
        )}

        {/* input */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a task..."
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "15px",
              outline: "none",
            }}
          />
          <button
            onClick={addTodo}
            style={{
              padding: "10px 18px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "15px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Add
          </button>
        </div>

        {/* filter buttons */}
        {todos.length > 0 && (
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            {["all", "active", "done"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "5px 14px",
                  borderRadius: "6px",
                  border: "1px solid",
                  borderColor: filter === f ? "#2563eb" : "#d1d5db",
                  background: filter === f ? "#eff6ff" : "#fff",
                  color: filter === f ? "#2563eb" : "#6b7280",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: filter === f ? "600" : "400",
                  textTransform: "capitalize",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        {/* list rendering with keys */}
        {visibleTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
          />
        ))}

        {/* conditional rendering: empty state */}
        {todos.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "48px 0",
              color: "#9ca3af",
              fontSize: "15px",
            }}
          >
            Nothing here yet. Add your first task.
          </div>
        )}

        {/* conditional rendering: all filtered out but todos exist */}
        {todos.length > 0 && visibleTodos.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "32px 0",
              color: "#9ca3af",
              fontSize: "14px",
            }}
          >
            No tasks in this filter.
          </div>
        )}
      </div>
    </div>
  );
}
