import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AssignTask from "./pages/AssignTask";
import Checklist from "./pages/Checklist";
import Department from "./pages/Department";
import CommitteeList from "./components/CommitteeList";
import EventCreationForm from "./pages/EventCreationForm";
import DashboardCocom from "./pages/DashboardCocom";
import DepartmentCocom from "./pages/DepartmentCocom";
import Intro from "./pages/Intro";

function App() {

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Intro />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboardcocom" element={<DashboardCocom />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        // for admins
        <Route path="/assigntask" element={<AssignTask />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/departments" element={<Department />} />
        <Route path="/eventform" element={<EventCreationForm />} />

        <Route path="/yourdepartment" element={<DepartmentCocom />} />

        <Route path="/committee" element={<CommitteeList />} />

      </Routes>
    </Router>
  )
}

export default App
