import dayjs from "dayjs";
import AppFullCalendar from "../../components/Calender/AppFullCalendar";
import NavBar from "../../components/NavBar/NavBar";
import { scheduleLeaves, scheduleSections } from "../../fakedata/data";
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
            sections={scheduleSections}
            leaves={scheduleLeaves}
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
