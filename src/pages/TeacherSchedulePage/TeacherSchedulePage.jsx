import dayjs from "dayjs";
import AppFullCalendar from "../../components/Calender/AppFullCalendar";
import NavBar from "../../components/NavBar/NavBar";
import { scheduleLeaves, scheduleSections, teacherSchedule } from "../../fakedata/data";
import styles from "./TeacherSchedulePage.module.css";
import { useParams } from "react-router";

const TeacherSchedulePage = () => {
  const { teacherId } = useParams();

  console.log(teacherSchedule);

  return (
    //TODO: Firhat
    <>
      <NavBar />
      <main>
        <div className={styles.calendarContainer}>
          <AppFullCalendar
            selectedTeacherSchedule={teacherSchedule}
            selectedTeacherId={Number(teacherId)}
            initialView="timeGridWeek"
            initialDate={"2025-10-27"}
          />
        </div>
      </main>
    </>
  );
};
export default TeacherSchedulePage;
