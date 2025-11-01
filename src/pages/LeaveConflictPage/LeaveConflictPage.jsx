import { useState } from "react";
import styles from "./LeaveConflictPage.module.css";
import { conflictAllLeaves, conflictAllLessons, conflictIdOne, conflictLessonsAndTeachers2 } from "../../fakedata/data";
import NavBar from "../../components/NavBar/NavBar";
import AppFullCalendar from "../../components/Calender/AppFullCalendar";
import ConflictForm from "../../components/ConflictForm/ConflictForm";
import { useParams } from "react-router";

const LeaveConflictPage = () => {
  //TODO: Firhat
  const { leaveId } = useParams();
  //TODO: get leave by leaveId and setConflictLeave(data)
  const [conflictLeave, setConflictLeave] = useState(conflictIdOne);
  const [formData, setFormData] = useState({
    subTeacherId: "",
    selectedLessonId: "",
  });
  const [selectedTeacherId, setSelectedTeacherId] = useState(conflictIdOne.teacher.id); // TODO: Change to null
  const [conflictLessonsAndTeachers, setConflictLessonsAndTeachers] = useState(conflictLessonsAndTeachers2);
  const conflictLessons = conflictLessonsAndTeachers.map((item) => item.lesson);
  const subTeachers = formData.selectedLessonId
    ? conflictLessonsAndTeachers.find((item) => item.lesson.id === formData.selectedLessonId).availableTeachers
    : [];
  // console.log(subTeachers);

  return (
    //TODO: Firhat
    <>
      <NavBar />
      <main>
        <ConflictForm
          conflictLeave={conflictLeave}
          conflictLessons={conflictLessons}
          subTeachers={subTeachers}
          formData={formData}
          setFormData={setFormData}
        />
        <div className={styles.calendarContainer}>
          <AppFullCalendar
            lessons={conflictAllLessons}
            leaves={conflictAllLeaves}
            selectedTeacherId={selectedTeacherId}
            initialView="timeGridWeek"
            initialDate={conflictLeave.start_date}
            setFormData={setFormData}
            conflictLessons={conflictLessons}
          />
        </div>
      </main>
    </>
  );
};
export default LeaveConflictPage;
