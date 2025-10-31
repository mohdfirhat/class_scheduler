import AppFullCalendar from "../../components/Calender/AppFullCalendar";
import NavBar from "../../components/NavBar/NavBar";
import { scheduleLeaves, scheduleLessons } from "../../fakedata/data";
import styles from "./TeacherSchedulePage.module.css";
import { useParams } from "react-router";

const TeacherSchedulePage = () => {
  const { teacherId } = useParams();

  return (
    //TODO: Firhat
    <>
      <NavBar />
      <main>
        <div className={styles.calendarContainer}>
          <AppFullCalendar
            lessons={scheduleLessons}
            leaves={scheduleLeaves}
            selectedTeacherId={Number(teacherId)}
            initialView="timeGridWeek"
          />
        </div>
      </main>
    </>
  );
};
export default TeacherSchedulePage;
