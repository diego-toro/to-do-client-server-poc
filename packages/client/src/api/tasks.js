import { fetchJSON } from "../utils/fetchJSON";

export function getTasks() {
  return fetchJSON("http://localhost:3000/api/tasks", {});
}

export function getTask(taskId) {
  return fetchJSON(`http://localhost:3000/api/tasks/${taskId}`, {});
}

export function addTask(newTask) {
  return fetchJSON("http://localhost:3000/api/tasks", {
    method: "POST",
    body: JSON.stringify(newTask),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
}

export function updateTask(task) {
  return fetchJSON(`http://localhost:3000/api/tasks/${task.id}`, {
    method: "PUT",
    body: JSON.stringify(task),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
}

export function deleteTask(taskId) {
  return fetchJSON(`http://localhost:3000/api/tasks/${taskId}`, {
    method: "DELETE",
  });
}
