import { useEffect, useState } from "react";
import styles from "./LeaveConflictPage.module.css";
import NavBar from "../../components/NavBar/NavBar";
import AppFullCalendar from "../../components/Calender/AppFullCalendar";
import ConflictForm from "../../components/ConflictForm/ConflictForm";
import { useNavigate, useParams } from "react-router";
import { BACKEND_URL } from "../../api/api";
import axios from "axios";
import toast from "react-hot-toast";

//Main table component
const LeaveConflictPage = () => {

  //useParams to use the param in the route path
  const { leaveId } = useParams();
  //useNavigate hook used for routing to other urls
  const navigate = useNavigate();
  //state used for toast functionality
  const [isLoading, setIsLoading] = useState(true);
  //state used for setting conflicting leave
  const [conflictLeave, setConflictLeave] = useState(null);
  //state for saving form data
  const [formData, setFormData] = useState({
    subTeacherId: "",
    selectedSectionId: "",
  });
  //state for saving all teacher sections
  const [allTeacherSections, SetAllTeacherSections] = useState([]);
  //state for saving all teacher leaves
  const [allTeacherLeaves, setAllTeacherLeaves] = useState([]);
  //state for saving all conflicting sections and teachers
  const [conflictSectionsAndTeachers, setConflictSectionsAndTeachers] = useState([]);
  //state for determining whether to refetch data
  const [refetchData, setRefetchData] = useState(true);
  //variable for saving primary teacher
  const teacherOne = conflictLeave ? conflictLeave.teacher : null;

  // change document title on new page
  useEffect(() => {
    document.title = "Leave Conflict | Lesson Scheduler";
  }, []);
  
  //function for retrieving data for secondary teacher
  const getTeacherTwo = () => {
    if (formData.selectedSectionId === "") return null;
    const section = conflictSectionsAndTeachers.find((section) => section.id == formData.selectedSectionId);
    if (formData.subTeacherId === "") return null;
    const teacherTwo = section.availableTeachers.find((teacher) => teacher.id == formData.subTeacherId);
    return teacherTwo;
  };

  //variable for saving secondary teacher
  const teacherTwo = getTeacherTwo();

  //variable of conflicting sections retrieved from conflictSectionsandTeachers
  const conflictSections = conflictSectionsAndTeachers.map(({ availableTeachers, ...section }) => section);
  
  //useEffect to render initial page load
  useEffect(() => {

    //function for fetching leaves from backend
    const fetchLeave = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/leaves/${leaveId}/teachers`);
        setConflictLeave(res.data);
      } catch (e) {
        console.log(e);
        toast.error("Error fetching Leave");
      }
    };

    //function for fetching conflicting sections with available teachers
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

    //function for fetching sections taught by all teachers involved 
    const fetchSectionsOfAllTeachersInvolved = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/sections/conflict_leave/${leaveId}/all_sections`);
        SetAllTeacherSections(res.data);
      } catch (e) {
        console.log(e);
        toast.error("Error Fetching Sections of all teacher involved");
      }
    };

    //function for fetching leaves of all teachers involved
    const fetchLeavesOfAllTeachers = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/leaves/conflict_leave/${leaveId}/all_leaves`);
        setAllTeacherLeaves(res.data);
      } catch (e) {
        console.log(e);
        toast.error("Error Fetching Leaves of all teacher involved");
      }
    };

    //function to run all fetch functions
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
