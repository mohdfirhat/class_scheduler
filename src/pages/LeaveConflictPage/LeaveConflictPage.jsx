import { useEffect, useState } from "react";
import styles from "./LeaveConflictPage.module.css";
import NavBar from "../../components/NavBar/NavBar";
import AppFullCalendar from "../../components/Calender/AppFullCalendar";
import ConflictForm from "../../components/ConflictForm/ConflictForm";
import { useParams } from "react-router";
import { BACKEND_URL } from "../../api/api";
import axios from "axios";

const LeaveConflictPage = () => {
  //TODO: Firhat
  const { leaveId } = useParams();

  //TODO: get leave by leaveId and setConflictLeave(data)
  const [isLoading, setIsLoading] = useState(true);
  const [conflictLeave, setConflictLeave] = useState(null);
  const [formData, setFormData] = useState({
    subTeacherId: "",
    selectedSectionId: "",
  });
  const [allTeacherSections, SetAllTeacherSections] = useState([]);
  const [allTeacherLeaves, setAllTeacherLeaves] = useState([]);
  const [conflictSectionsAndTeachers, setConflictSectionsAndTeachers] = useState([]);

  const conflictSections = conflictSectionsAndTeachers.map(({ availableTeachers, ...section }) => section);

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/leaves/${leaveId}/teachers`);
        console.log("🗓️Leave Details:");
        console.log(res.data);
        setConflictLeave(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    const fetchConflictingSectionsWithAvailableTeacher = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/sections/conflict_leave/${leaveId}/available_teachers`);
        console.log("🗓️🧑‍🏫Available Teachers for conflicting sections:");
        console.log(res.data);
        setConflictSectionsAndTeachers(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    const fetchSectionsOfAllTeachersInvolved = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/sections/conflict_leave/${leaveId}/all_sections`);
        console.log("📝🧑‍🏫All Sections of all teacher involved (3 months):");
        console.log(res.data);
        SetAllTeacherSections(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    const fetchLeavesOfAllTeachers = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/leaves/conflict_leave/${leaveId}/all_leaves`);
        console.log("🗓️🧑‍🏫All Leaves of all teacher involved (3 months):");
        console.log(res.data);
        setAllTeacherLeaves(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchLeave();
    fetchConflictingSectionsWithAvailableTeacher();
    fetchSectionsOfAllTeachersInvolved();
    fetchLeavesOfAllTeachers();
    setIsLoading(false);
  }, []);

  return (
    //TODO: Firhat
    <>
      <NavBar />
      <main>
        {!isLoading && (
          <ConflictForm
            conflictLeave={conflictLeave}
            conflictSectionsAndTeachers={conflictSectionsAndTeachers}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {!isLoading && (
          <div className={styles.calendarContainer}>
            <AppFullCalendar
              sections={allTeacherSections}
              leaves={allTeacherLeaves}
              selectedTeacherId={conflictLeave ? conflictLeave.teacher.id : 0}
              initialView="timeGridWeek"
              initialDate={conflictLeave ? conflictLeave.startDate : new Date().toISOString()}
              setFormData={setFormData}
              conflictSections={conflictSections}
            />
          </div>
        )}
      </main>
    </>
  );
};
export default LeaveConflictPage;
