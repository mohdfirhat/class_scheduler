import { useEffect, useState } from "react";
import styles from "./LeaveConflictPage.module.css";
import NavBar from "../../components/NavBar/NavBar";
import AppFullCalendar from "../../components/Calender/AppFullCalendar";
import ConflictForm from "../../components/ConflictForm/ConflictForm";
import { useNavigate, useParams } from "react-router";
import { BACKEND_URL } from "../../api/api";
import axios from "axios";
import toast from "react-hot-toast";

const LeaveConflictPage = () => {
  const { leaveId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [conflictLeave, setConflictLeave] = useState(null);
  const [formData, setFormData] = useState({
    subTeacherId: "",
    selectedSectionId: "",
  });
  const [allTeacherSections, SetAllTeacherSections] = useState([]);
  const [allTeacherLeaves, setAllTeacherLeaves] = useState([]);
  const [conflictSectionsAndTeachers, setConflictSectionsAndTeachers] = useState([]);
  const [refetchData, setRefetchData] = useState(true);
  const teacherOne = conflictLeave ? conflictLeave.teacher : null;

  // change document title on new page
  useEffect(() => {
    document.title = "Leave Conflict | Lesson Scheduler";
  }, []);

  const getTeacherTwo = () => {
    if (formData.selectedSectionId === "") return null;
    const section = conflictSectionsAndTeachers.find((section) => section.id == formData.selectedSectionId);
    if (formData.subTeacherId === "") return null;
    const teacherTwo = section.availableTeachers.find((teacher) => teacher.id == formData.subTeacherId);
    return teacherTwo;
  };
  const teacherTwo = getTeacherTwo();

  const conflictSections = conflictSectionsAndTeachers.map(({ availableTeachers, ...section }) => section);
  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/leaves/${leaveId}/teachers`);
        setConflictLeave(res.data);
      } catch (e) {
        console.log(e);
        toast.error("Error fetching Leave");
      }
    };
    const fetchConflictingSectionsWithAvailableTeacher = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/sections/conflict_leave/${leaveId}/available_teachers`);
        if (res.data.length == 0) {
          toast.error("No Conflicting Section Found.");
          const toastId = toast.loading("Redirecting to Leave tab.");
          setTimeout(() => {
            navigate("/dashboard/leaves");
            toast.dismiss(toastId);
          }, 5000);
        }
        setConflictSectionsAndTeachers(res.data);
      } catch (e) {
        console.log(e);
        toast.error("Error fetching available teachers for sections");
      }
    };
    const fetchSectionsOfAllTeachersInvolved = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/sections/conflict_leave/${leaveId}/all_sections`);
        SetAllTeacherSections(res.data);
      } catch (e) {
        console.log(e);
        toast.error("Error Fetching Sections of all teacher involved");
      }
    };
    const fetchLeavesOfAllTeachers = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/leaves/conflict_leave/${leaveId}/all_leaves`);
        setAllTeacherLeaves(res.data);
      } catch (e) {
        console.log(e);
        toast.error("Error Fetching Leaves of all teacher involved");
      }
    };
    const fetchAll = async () => {
      try {
        await fetchLeave();
        await fetchConflictingSectionsWithAvailableTeacher();
        await fetchSectionsOfAllTeachersInvolved();
        await fetchLeavesOfAllTeachers();
      } finally {
        setIsLoading(false); // ✅ Only after everything is loaded
      }
    };
    if (refetchData) {
      fetchAll();
      setRefetchData(false);
    }
  }, [refetchData, leaveId]);

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
            setRefetchData={setRefetchData}
          />
        )}
        {!isLoading && (
          <div className={styles.calendarMainContainer}>
            <div className={styles.calendarContainer}>
              <AppFullCalendar
                sections={allTeacherSections}
                leaves={allTeacherLeaves}
                teacher={teacherOne}
                conflictingLeaveId={leaveId}
                // otherTeacherId={formData.subTeacherId}
                selectedTeacherId={conflictLeave ? conflictLeave.teacher.id : 0}
                initialView="timeGridWeek"
                initialDate={conflictLeave ? conflictLeave.startDate : new Date().toISOString()}
                setFormData={setFormData}
                conflictSections={conflictSections}
                selectedConflictSection={formData.selectedSectionId}
              />
            </div>

            <div className={styles.calendarContainer}>
              <AppFullCalendar
                sections={allTeacherSections}
                leaves={allTeacherLeaves}
                teacher={teacherTwo}
                conflictingSectionId={formData.selectedSectionId}
                conflictingLeaveId={leaveId}
                displayConflictingSection={true}
                otherTeacherId={formData.subTeacherId}
                selectedTeacherId={0}
                initialView="timeGridWeek"
                initialDate={conflictLeave ? conflictLeave.startDate : new Date().toISOString()}
                setFormData={setFormData}
                conflictSections={conflictSections}
                selectedConflictSection={formData.selectedSectionId}
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
};
export default LeaveConflictPage;
