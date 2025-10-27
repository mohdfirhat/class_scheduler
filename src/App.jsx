import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import LeaveConflictPage from "./pages/LeaveConflictPage/LeaveConflictPage";
import TeacherSchedulePage from "./pages/TeacherSchedulePage/TeacherSchedulePage";
import TeachersOverviewPage from "./pages/TeachersOverviewPage";
import LessonOverviewPage from "./pages/LessonOverviewPage";
import LeaveOverviewPage from "./pages/LeaveOverviewPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/schedule/2" replace />} />
      <Route path="/lessons" element={<LessonOverviewPage />} />
      <Route path="/leaves" element={<LeaveOverviewPage />} />
      <Route path="/teachers" element={<TeachersOverviewPage />} />
      <Route path="/schedule/:teacherId" element={<TeacherSchedulePage />} />
      <Route path="/conflicts/:leaveId" element={<LeaveConflictPage />} />
    </Routes>
  );
}

export default App;
