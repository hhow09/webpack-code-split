import React from "react";

const TodoItem = ({ onClick, todoItem, onDeleteClick }) => (
  <li className="todo-item flex v-center">
    <span
      className={`${todoItem.completed ? "todo-checked" : ""} todo-checkbox `}
      onClick={onClick}></span>
    <span
      className={`${todoItem.completed ? "todo-true" : "todo-false"} flex1 toto-text`}
      onClick={onClick}>
      {todoItem.text}
    </span>
    <span
      className={`${todoItem.completed ? "todo-true" : "todo-false"}  toto-text v-center`}
      onClick={onDeleteClick}>
      <i className="fa fa-trash-alt delete-todo"></i>
    </span>
  </li>
);
export default TodoItem;
