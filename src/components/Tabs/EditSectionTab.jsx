import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import styles from "./CreateSectionTab.module.css";

import SectionForm from "../SectionForm/SectionForm";
import AppFullCalendar from "../Calender/AppFullCalendar";
import { leaves, sections } from "../../fakedata/data";
import dayjs from "dayjs";

const defaultSection = {
  courseCode: "",
  remarks: "",
  classSize: "",
  date: dayjs().toISOString(),
  timeslot: "",
  teacherId: "",
  venueId: "",
};

const EditSectionTab = ({ sectionObject = defaultSection, isUpdating }) => {
  const { sectionId } = useParams();

  const calendarOneRef = useRef(null);
  const calendarTwoRef = useRef(null);
  const [formData, setFormData] = useState(sectionObject);

  const [teacherOneId, setTeacherOneId] = useState(2);
  const [teacherTwoId, setTeacherTwoId] = useState(3);

  const teacherOneLeaves = leaves.filter((leave) => leave.teacher.id === teacherOneId);
  const teacherOneSections = sections.filter((section) => section.teacher.id === teacherOneId);
  const teacherTwoLeaves = leaves.filter((leave) => leave.teacher.id === teacherTwoId);
  const teacherTwoSections = sections.filter((section) => section.teacher.id === teacherTwoId);

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
    { id: 1, name: "Bob" },
    { id: 2, name: "Jim" },
    { id: 3, name: "Dr. Brown" },
  ];

  // 🏫 Fake venue data (as if from DB)
  const venues = [
    {
      id: 10,
      name: "Room 101",
      occupancy: 30,
      src: "https://uploads.teachablecdn.com/attachments/ci7bzIifRVqCgY7825cT_ivan-aleksic-PDRFeeDniCk-unsplash.jpg",
      description: "brief classroom description",
    },
    {
      id: 11,
      name: "Lab 2",
      occupancy: 50,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7OxaAhMWB_HKPoEj0ra9oyrnMQ1BLCEDOrQ&s",
      description: "brief lab description",
    },
    {
      id: 12,
      name: "Auditorium",
      occupancy: 100,
      src: "https://www.csctessensohn.sg/images/gather/gather_aud_left5.png",
      description: "brief auditorium description",
    },
  ];

  return (
    //TODO: Firhat
    <>
      <SectionForm
        teachers={teachers}
        venues={venues}
        setFormData={setFormData}
        formData={formData}
        sectionId={sectionId}
        isUpdating={isUpdating}
      />
      <div className={styles.calendarContainer}>
        {/* <AppFullCalendar
          leaves={teacherOneLeaves}
          selectedTeacherId={teacherOneId}
          sections={teacherOneSections}
          initialView="timeGridDay"
          // initialDate={Date.now()}
          ref={calendarOneRef}
        />
        <AppFullCalendar
          leaves={teacherTwoLeaves}
          sections={teacherTwoSections}
          initialView="timeGridDay"
          // initialDate={Date.now()}
          ref={calendarTwoRef}
        /> */}
      </div>
    </>
  );
};

export default CreateSectionTab;
