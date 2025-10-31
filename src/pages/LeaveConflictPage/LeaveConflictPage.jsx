import { useState } from "react";
import styles from "./LeaveConflictPage.module.css";
import { leaves, lessons } from "../../fakedata/data";
import NavBar from "../../components/NavBar/NavBar";
import AppFullCalendar from "../../components/Calender/AppFullCalendar";

const LeaveConflictPage = () => {
  //TODO: Firhat
  const [selectedTeacherId, setSelectedTeacherId] = useState(2); // TODO: Change to null

  return (
    //TODO: Firhat
    <>
      <NavBar />
      <main>
        <div className={styles.calendarContainer}>
          <AppFullCalendar
            lessons={lessons}
            leaves={leaves}
            selectedTeacherId={selectedTeacherId}
            initialView="timeGridWeek"
          />
        </div>
      </main>
    </>
  );
};
export default LeaveConflictPage;
