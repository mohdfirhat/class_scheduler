import NavBar from "../../components/NavBar/NavBar";
// import { scheduleLeaves, scheduleSections, teacherSchedule } from "../../fakedata/data";
import styles from "./TeacherSchedulePage.module.css";
import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../../api/api";
import axios from "axios";
import ScheduleFullCalendar from "../../components/Calender/ScheduleFullCalendar";

const TeacherSchedulePage = () => {
  const { teacherId } = useParams();
  const calRef = useRef(null);
  const [leaves, setLeaves] = useState([]);
  const [sections, setSections] = useState([]);
  const [teacher, setTeacher] = useState([]);

  useEffect(() => {
    const fetchTeacherSchedule = async () => {
      const res = await axios.get(`${BACKEND_URL}/api/teachers/schedules/${teacherId}`);
      console.log("🧑‍🏫Teacher Schedules");
      console.log(res.data);
      setLeaves(res.data.leaves);
      setSections(res.data.sections);
      setTeacher(res.data);
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
            initialDate={Date.now()}
            ref={calRef}
          />
        </div>
      </main>
    </>
  );
};
export default TeacherSchedulePage;
