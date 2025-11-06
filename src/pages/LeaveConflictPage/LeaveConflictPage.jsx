import { useState } from "react";
import styles from "./LeaveConflictPage.module.css";
import { conflictAllLeaves, conflictAllSections, conflictIdOne, conflictSectionsAndTeachers2 } from "../../fakedata/data";
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
    selectedSectionId: "",
  });
  const [selectedTeacherId, setSelectedTeacherId] = useState(conflictIdOne.teacher.id); // TODO: Change to null
  const [conflictSectionsAndTeachers, setConflictSectionsAndTeachers] = useState(conflictSectionsAndTeachers2);
  const conflictSections = conflictSectionsAndTeachers.map((item) => item.section);
  const subTeachers = formData.selectedSectionId
    ? conflictSectionsAndTeachers.find((item) => item.section.id === formData.selectedSectionId).availableTeachers
    : [];
  // console.log(subTeachers);

  return (
    //TODO: Firhat
    <>
      <NavBar />
      <main>
        <ConflictForm
          conflictLeave={conflictLeave}
          conflictSections={conflictSections}
          subTeachers={subTeachers}
          formData={formData}
          setFormData={setFormData}
        />
        <div className={styles.calendarContainer}>
          <AppFullCalendar
            sections={conflictAllSections}
            leaves={conflictAllLeaves}
            selectedTeacherId={selectedTeacherId}
            initialView="timeGridWeek"
            initialDate={conflictLeave.start_date}
            setFormData={setFormData}
            conflictSections={conflictSections}
          />
        </div>
      </main>
    </>
  );
};
export default LeaveConflictPage;
