import FullCalender from "../components/Calender/FullCalendar";
import NavBar from "../components/NavBar/NavBar";
import { leaves, lessons } from "../fakedata/data";
import styles from "./TeacherSchedulePage.module.css";

const TeacherSchedulePage = () => {
  return (
    //TODO: Firhat
    <>
      <NavBar />
      <main>
        <div className={styles.calendarContainer}>
          <FullCalender lessons={lessons} leaves={leaves} />
        </div>
      </main>
    </>
  );
};
export default TeacherSchedulePage;
