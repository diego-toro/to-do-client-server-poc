import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Tasks from "./routes/Tasks";
import Labels from "./routes/Labels";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="tasks/*" element={<Tasks />} />
          <Route path="labels" element={<Labels />} />
          <Route path="*" element={<Navigate to="tasks" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
