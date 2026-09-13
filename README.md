# Todo App

A simple todo app built with React to practice the core concepts: components, props, state, and effects.


---

## What it demonstrates

| Concept | Where it shows up |
|---|---|
| Functional Components | `TodoItem` is a separate component that takes props and renders one task |
| Props | `todo`, `onDelete`, `onToggle` passed from parent to `TodoItem` |
| useState | Manages the task list, input field value, and active filter tab |
| useEffect | Updates browser tab title with remaining task count whenever todos change |
| Conditional Rendering | Empty state, task count, strikethrough on done tasks |
| List Rendering | `todos.map()` with `key={todo.id}` to render each task |

---

## Features

- Add tasks by typing and pressing Enter or clicking Add
- Mark tasks as done with a checkbox
- Delete individual tasks
- Filter by All / Active / Done
- Tab title updates with remaining task count

---

## How to Run

```bash
npm install
npm run dev
```

Then open the given link in your browser.

---

## Deployed

[Live Demo](https://todo-app-ecru-omega.vercel.app/)

---

## Files

```
todo-app/
├── src/
│   ├── TodoApp.jsx
│   ├── App.jsx
│   └── index.css
├── index.html
└── package.json
```
