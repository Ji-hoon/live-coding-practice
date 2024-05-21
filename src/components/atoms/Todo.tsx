import React from "react";
import { todoType } from "../pages/Todos";

// eslint-disable-next-line react-refresh/only-export-components
function Todo({ todo }: { todo: todoType }) {
  return (
    <div>
      {todo.id} | {todo.todo} | {todo.completed ? "COMPLETED" : "NOT COMPLETED"}
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(Todo);
