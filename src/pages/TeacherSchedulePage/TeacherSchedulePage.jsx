import NavBar from "../../components/NavBar/NavBar";
import styles from "./TeacherSchedulePage.module.css";
import { useLocation, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../../api/api";
import axios from "axios";
import ScheduleFullCalendar from "../../components/Calender/ScheduleFullCalendar";
import toast from "react-hot-toast";

const TeacherSchedulePage = () => {
  // get the initialDate from state that is passed from TeacherTable(if passed)
  const { state } = useLocation();
  // extract teacherId from Params
  const { teacherId } = useParams();
  // Reference for FullCalendar
  const calRef = useRef(null);
  // State for Teacher Leaves
  const [leaves, setLeaves] = useState([]);
  // State for Teacher Sections
  const [sections, setSections] = useState([]);
  // State for Teacher
  const [teacher, setTeacher] = useState(null);

  // change document title on new page
  useEffect(() => {
    document.title = "Schedules | Lesson Scheduler";
  }, []);

  // Fetch Teacher Schedule when teacherId param changes
  useEffect(() => {
    const fetchTeacherSchedule = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/teachers/schedules/${teacherId}`);
        console.log(res);
        setLeaves(res.data.teacherLeaves);
        setSections(res.data.sections);
        setTeacher(res.data);
      } catch (e) {
        console.log(e);
        toast.error("Error fetching teacher schedules.");
      }
    };
    fetchTeacherSchedule();
  }, [teacherId]);

  return (
    //TODO: Firhat
    <>
      <NavBar />
      <main>
        <div className={styles.calendarContainer}>
          <ScheduleFullCalendar
            selectedTeacherId={teacherId}
            teacher={teacher}
            leaves={leaves}
            sections={sections}
            initialView="timeGridWeek"
            initialDate={state === null ? Date.now() : state.initialDate}
            // initialDate={Date.now()}
            ref={calRef}
          />
        </div>
      </main>
    </>
  );
};
export default TeacherSchedulePage;
