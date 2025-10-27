import FullCalender from "../../components/Calender/FullCalendar";
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
          <FullCalender lessons={scheduleLessons} leaves={scheduleLeaves} selectedTeacherId={Number(teacherId)} />
        </div>
      </main>
    </>
  );
};
export default TeacherSchedulePage;
