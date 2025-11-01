import { useParams } from "react-router";
import NavBar from "../../components/NavBar/NavBar";
import { useEffect, useRef, useState } from "react";
import styles from "./CreateLessonPage.module.css";

import LessonForm from "../../components/LessonForm/LessonForm";
import LessonPageBreadcrumbs from "../../components/LessonPageBreadcrumbs";
import AppFullCalendar from "../../components/Calender/AppFullCalendar";
import { leaves, lessons } from "../../fakedata/data";
import dayjs from "dayjs";

const CreateLessonPage = () => {
  //set now to 27/10/25 08.00
  const now = dayjs().date(27).month(9).hour(8).minute(0).second(0).millisecond(0);
  const twoHoursLater = now.add(2, "hour");

  const { lessonId } = useParams();
  console.log(lessonId);
  const calendarOneRef = useRef(null);
  const calendarTwoRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    classSize: "",
    date: now.toISOString(), // defaults to today
    startTime: now.toISOString(), // 8 AM
    endTime: twoHoursLater.toISOString(), // 10 AM
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
  //   //if does not exist? redirect to create
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
    { id: 10, name: "Room 101", occupancy: 30,
      src:'https://uploads.teachablecdn.com/attachments/ci7bzIifRVqCgY7825cT_ivan-aleksic-PDRFeeDniCk-unsplash.jpg',
      description:'brief classroom description'
    },
    { id: 11, name: "Lab 2", occupancy:50,
      src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7OxaAhMWB_HKPoEj0ra9oyrnMQ1BLCEDOrQ&s',
      description:'brief lab description'
    },
    { id: 12, name: "Auditorium", occupancy:100,
      src:'https://www.csctessensohn.sg/images/gather/gather_aud_left5.png',
      description:'brief auditorium description'
    },
  ];

  return (
    //TODO: Firhat
    <>
      <NavBar />
      <LessonPageBreadcrumbs />
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
