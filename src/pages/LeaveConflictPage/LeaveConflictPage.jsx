import { useState } from "react";
import styles from "./LeaveConflictPage.module.css";
import { leaves, lessons } from "../../fakedata/data";
import NavBar from "../../components/NavBar/NavBar";
import FullCalender from "../../components/Calender/FullCalendar";

const LeaveConflictPage = () => {
  //TODO: Firhat
  const [selectedTeacherId, setSelectedTeacherId] = useState(2); // TODO: Change to null

  return (
    //TODO: Firhat
    <>
      <NavBar />
      <main>
        <div className={styles.calendarContainer}>
          <FullCalender lessons={lessons} leaves={leaves} selectedTeacherId={selectedTeacherId} />
        </div>
      </main>
    </>
  );
};
export default LeaveConflictPage;
