import { fetchJSON } from "../utils/fetchJSON";

export function getLabels() {
  return fetchJSON("http://localhost:3000/api/labels", {});
}

export function getLabel(labelId) {
  return fetchJSON(`http://localhost:3000/api/labels/${labelId}`, {});
}

export function addLabel(newLabel) {
  return fetchJSON("http://localhost:3000/api/labels", {
    method: "POST",
    body: JSON.stringify(newLabel),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
}

export function updateLabel(label) {
  return fetchJSON(`http://localhost:3000/api/labels/${label.id}`, {
    method: "PUT",
    body: JSON.stringify(label),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
}

export function deleteLabel(labelId) {
  return fetchJSON(`http://localhost:3000/api/labels/${labelId}`, {
    method: "DELETE",
  });
}
