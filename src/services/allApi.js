import { commonApi } from "./commonApi";
import { serverURL } from "./serverURL";

// Add new task
export const addToDoAPI = async (reqBody) => {
  return await commonApi("POST", `${serverURL}/todo`, reqBody);
};

// Get all tasks
export const getToDoAPI = async () => {
  return await commonApi("GET", `${serverURL}/todo`, "");
};

// Delete task 
export const deleteToDoAPI = async (id) => {
  return await commonApi("DELETE", `${serverURL}/todo/${id}`, "");
};

// Update task 
export const updateToDoAPI = async (id, reqBody) => {
  return await commonApi("PUT", `${serverURL}/todo/${id}`, reqBody);
};
