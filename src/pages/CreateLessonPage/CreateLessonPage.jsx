import { useParams } from "react-router";
import NavBar from "../../components/NavBar/NavBar";
import { useEffect, useRef, useState } from "react";
import styles from "./CreateLessonPage.module.css";

import LessonForm from "../../components/LessonForm/LessonForm";
import { getLocalDatetimeString } from "../../utils/DateFuncs";
import AppFullCalendar from "../../components/Calender/AppFullCalendar";
import { leaves, lessons } from "../../fakedata/data";

const CreateLessonPage = () => {
  const now = new Date("2025-10-27 08:00:00");
  const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  const { lessonId } = useParams();
  const calendarOneRef = useRef(null);
  const calendarTwoRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: getLocalDatetimeString(now),
    startTime: "",
    endTime: "",
    teacherId: 1,
    venueId: 11,
  });
  const [teacherOneId, setTeacherOneId] = useState(2);
  const [teacherTwoId, setTeacherTwoId] = useState(3);

  const teacherOneLeaves = leaves.filter((leave) => leave.teacher.id === teacherOneId);
  const teacherOneLessons = lessons.filter((lesson) => lesson.teacher.id === teacherOneId);
  const teacherTwoLeaves = leaves.filter((leave) => leave.teacher.id === teacherTwoId);
  const teacherTwoLessons = lessons.filter((lesson) => lesson.teacher.id === teacherTwoId);

  // useEffect(() => {
  //   //Fetch lesson details
  // }, []);
  useEffect(() => {
    const calendarOneApi = calendarOneRef.current?.getApi();
    const calendarTwoApi = calendarTwoRef.current?.getApi();
    if (calendarOneApi) {
      calendarOneApi.gotoDate(formData.date);
    }
    if (calendarTwoApi) {
      calendarTwoApi.gotoDate(formData.date);
    }
  }, [formData.date]);

  // 🧑‍🏫 Fake teacher data (as if from DB)
  const teachers = [
    { id: 1, name: "Mr. Smith" },
    { id: 2, name: "Ms. Johnson" },
    { id: 3, name: "Dr. Brown" },
  ];

  // 🏫 Fake venue data (as if from DB)
  const venues = [
    { id: 10, name: "Room 101" },
    { id: 11, name: "Lab 2" },
    { id: 12, name: "Auditorium" },
  ];

  return (
    //TODO: Firhat
    <>
      <NavBar />
      <LessonForm
        teachers={teachers}
        venues={venues}
        setFormData={setFormData}
        formData={formData}
        lessonId={lessonId}
      />
      <div className={styles.calendarContainer}>
        <AppFullCalendar
          leaves={teacherOneLeaves}
          selectedTeacherId={teacherOneId}
          lessons={teacherOneLessons}
          initialView="timeGridDay"
          // initialDate={Date.now()}
          ref={calendarOneRef}
        />
        <AppFullCalendar
          leaves={teacherTwoLeaves}
          lessons={teacherTwoLessons}
          initialView="timeGridDay"
          // initialDate={Date.now()}
          ref={calendarTwoRef}
        />
      </div>
    </>
  );
};

export default CreateLessonPage;
