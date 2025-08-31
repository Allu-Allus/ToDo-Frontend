import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { LuListTodo } from "react-icons/lu";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { MdOutlineSecurityUpdateGood } from "react-icons/md";
import TodoTable from "../components/TodoTable";
import {
  addToDoAPI,
  getToDoAPI,
  deleteToDoAPI,
  updateToDoAPI,
} from "../services/allApi";

function ToDo() {
  const [addData, setAddData] = useState({ taskname: "" });
  const [todos, setTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Fetch all tasks
  const fetchTodos = async () => {
    try {
      const result = await getToDoAPI();
      setTodos(result.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new task
  const handleAddItem = async () => {
    if (!addData.taskname.trim()) {
      alert("Fill Data");
      return;
    }
    try {
      const result = await addToDoAPI(addData);
      setTodos((prev) => [...prev, result.data]);
      setAddData({ taskname: "" });
    } catch (error) {
      console.log(error);
    }
  };

  // Edit click
  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditingText(todos[index].taskname);
  };

  // Update task
  const handleUpdate = async () => {
    if (!editingText.trim()) {
      alert("Task cannot be empty");
      return;
    }
    try {
      const taskToUpdate = todos[editingIndex];
      const updatedTask = { ...taskToUpdate, taskname: editingText };

      await updateToDoAPI(taskToUpdate._id, updatedTask);

      const updatedTodos = [...todos];
      updatedTodos[editingIndex] = updatedTask;
      setTodos(updatedTodos);

      setEditingIndex(null);
      setEditingText("");
    } catch (error) {
      console.log(error);
    }
  };

  // Delete task
  const handleDelete = async (index) => {
    try {
      const taskToDelete = todos[index];
      await deleteToDoAPI(taskToDelete._id);

      const updatedTodos = [...todos];
      updatedTodos.splice(index, 1);
      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#f4f7fa", minHeight: "100vh" }}
    >
      <Card style={{ width: "18rem", backgroundColor: "#ffffff", borderRadius: "16px" }}>
        <Card.Body>
          <h1 className="d-flex justify-content-center align-items-center mb-3">
            <LuListTodo /> To-Do List
          </h1>

          <div className="d-flex justify-content-center mt-3">
            <input
              style={{
                backgroundColor: "#f1f5f9",
                border: "1px solid #cbd5e1",
                borderRadius: "4px",
                padding: "6px",
                width: "70%",
              }}
              type="text"
              value={editingIndex !== null ? editingText : addData.taskname}
              onChange={(e) =>
                editingIndex !== null
                  ? setEditingText(e.target.value)
                  : setAddData({ taskname: e.target.value })
              }
              placeholder="Enter your habit"
            />
            <button
              className="btn ms-2"
              style={{
                backgroundColor: "#0288d1",
                color: "#fff",
                padding: "6px 12px",
                borderRadius: "4px",
                border: "none",
              }}
              onClick={editingIndex !== null ? handleUpdate : handleAddItem}
            >
              {editingIndex !== null ? (
                <MdOutlineSecurityUpdateGood />
              ) : (
                <MdOutlinePlaylistAddCheck />
              )}
            </button>
          </div>

          <TodoTable todos={todos} onEdit={handleEditClick} onDelete={handleDelete} />
        </Card.Body>
      </Card>
    </div>
  );
}

export default ToDo;
