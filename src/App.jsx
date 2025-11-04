import { Navigate, Route, Routes } from "react-router";

import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import LeaveConflictPage from "./pages/LeaveConflictPage/LeaveConflictPage";
import TeacherSchedulePage from "./pages/TeacherSchedulePage/TeacherSchedulePage";
import TeachersOverviewPage from "./pages/TeachersOverviewPage";
import LessonOverviewPage from "./pages/LessonOverviewPage";
import LeaveOverviewPage from "./pages/LeaveOverviewPage";
import CreateLessonPage from "./pages/CreateLessonPage/CreateLessonPage";
import VenuePopup from "./components/VenuePopup/VenuePopup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/schedules/2" replace />} />
      <Route path="dashboard/lessons" element={<LessonOverviewPage />} />
      <Route path="/lessons/:lessonId?" element={<CreateLessonPage />} />
      <Route path="dashboard/leaves" element={<LeaveOverviewPage />} />
      <Route path="dashboard/teachers" element={<TeachersOverviewPage />} />
      <Route path="/schedules/:teacherId" element={<TeacherSchedulePage />} />
      <Route path="/conflicts/:leaveId" element={<LeaveConflictPage />} />
      <Route path="/venue" element={<VenuePopup/>} />
    </Routes>
  );
}

export default App;
