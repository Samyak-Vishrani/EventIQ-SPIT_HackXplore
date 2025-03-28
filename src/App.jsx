import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AssignTask from "./pages/AssignTask";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/assigntask" element={<AssignTask />} />
      </Routes>
    </Router>
  )
}

export default App
