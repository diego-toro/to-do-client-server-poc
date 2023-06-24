import { Route, Routes } from "react-router-dom";
import TasksBoard from "./TasksBoard";
import TaskDetails from "./TaskDetails";

function Tasks() {
  return (
    <Routes>
      <Route index element={<TasksBoard />} />
      <Route path=":id" element={<TaskDetails />} />
    </Routes>
  );
}

export default Tasks;
