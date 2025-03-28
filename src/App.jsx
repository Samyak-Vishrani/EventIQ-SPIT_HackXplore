import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AssignTask from "./pages/AssignTask";
import Checklist from "./pages/Checklist";
import Department from "./pages/Department";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/assigntask" element={<AssignTask />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/departments" element={<Department />} />
      </Routes>
    </Router>
  )
}

export default App
