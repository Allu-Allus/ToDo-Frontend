import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteSweep } from "react-icons/md";

function TodoTable({ todos, onEdit, onDelete }) {
  return (
    <div className="mt-3">
      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
        <table
          className="table table-bordered table-sm text-center"
          style={{ width: "100%", fontSize: "14px" }}
        >
          <thead style={{ backgroundColor: "#e1f5fe" }}>
            <tr>
              <th>Sl.No</th>
              <th>Task Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.filter(t => t && t.taskname).length === 0 ? (
              <tr>
                <td colSpan={4}>No tasks found</td>
              </tr>
            ) : (
              todos
                .filter(t => t && t.taskname)
                .map((todo, index) => (
                  <tr key={todo._id}>
                    <td>{index + 1}</td>
                    <td>{todo.taskname}</td>
                    <td>
                      <button
                        className="btn btn-link p-0 text-primary"
                        onClick={() => onEdit(index)}
                      >
                        <CiEdit size={18} />
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-link p-0 text-danger"
                        onClick={() => onDelete(index)}
                      >
                        <MdOutlineDeleteSweep size={18} />
                      </button>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TodoTable;
