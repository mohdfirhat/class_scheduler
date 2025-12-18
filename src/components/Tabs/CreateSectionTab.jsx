import { useEffect, useReducer, useRef, useState } from "react";
import styles from "./CreateSectionTab.module.css";

import SectionForm from "../../components/SectionForm/SectionForm";
import dayjs from "dayjs";
import ScheduleFullCalendar from "../Calender/ScheduleFullCalendar";
import { BACKEND_URL } from "../../api/api";
import axios from "axios";
import toast from "react-hot-toast";

//default variables for section form
const defaultSection = {
  courseCode: "",
  remarks: "",
  classSize: "",
  date: dayjs(),
  timeslot: "",
  teacherId: "",
  venueId: "",
};

//default variables for tentitive section
const defaultTentitiveSection = {
  course: {
    courseCode: "",
  },
  date: dayjs(),
  timeslot: {
    startTime: "",
    endTime: "",
  },
  venue: {
    name: "",
    description: "",
  },
};

const CreateSectionTab = ({ isUpdating }) => {
  // Reducer function for formData mutation
  const formReducerFunc = (prevState, action) => {
    switch (action.type) {
      case "date":
        return {
          ...prevState,
          formData: {
            ...prevState.formData,
            [action.type]: action.value,
          },
        };

      case "classSize":
        //validation for class size field for non-number inputs and min/max class sizes
        if (/[^0-9]/g.test(action.value) || action.value > 200 || action.value < 1) {
          return {
            ...prevState,
            formData: {
              ...prevState.formData,
              [action.type]: "",
            },
            validClassSize: false,
          };
        } else {
          return {
            ...prevState,
            formData: {
              ...prevState.formData,
              [action.type]: action.value,
            },
            validClassSize: true,
          };
        }
      case "setData":
        return {
          ...prevState,
          formData: action.value,
        };
      default:
        return {
          ...prevState,
          formData: {
            ...prevState.formData,
            [action.type]: action.value,
          },
        };
    }
  };
  // initial State of reducer
  const initState = { formData: defaultSection, validClassSize: true };

  // Reducer for formState and dispatch function
  const [formState, dispatchFormData] = useReducer(formReducerFunc, initState);
  // Reference for FullCalendar
  const calendarOneRef = useRef(null);
  // State for available teachers
  const [availTeacher, setAvailTeacher] = useState([]);
  // State for available venues
  const [availVenues, setAvailVenues] = useState([]);
  // State for teacherOneId teachers
  const [teacherOneId, setTeacherOneId] = useState(null);
  // State for teacherOne leaves
  const [teacherOneLeaves, setTeacherOneLeaves] = useState([]);
  // State for teacherOne sections
  const [teacherOneSections, setTeacherOneSections] = useState([]);
  // State for teacherOne
  const [teacherOne, setTeacherOne] = useState(null);
  // State for tentitive Section
  const [tentitiveSection, setTentitiveSection] = useState(defaultTentitiveSection);
  // State to toggle refreshing data from database
  const [refreshSchedule, setRefreshSchedule] = useState(true);

  // useEffect to change FullCalendar page on form date change
  useEffect(() => {
    const calendarOneApi = calendarOneRef.current?.getApi();
    if (calendarOneApi) {
      const date = formState.formData.date ? new Date(formState.formData.date) : new Date();
      calendarOneApi.gotoDate(date);
    }
  }, [formState.formData.date]);

  // useEffect to fetch teacher schedule(sections and leaves)
  useEffect(() => {
    if (teacherOneId && refreshSchedule) {
      const fetchTeacherSchedule = async () => {
        try {
          const res = await axios.get(`${BACKEND_URL}/api/teachers/schedules/${teacherOneId}`);
          console.log(res.data);
          setTeacherOneLeaves(res.data.teacherLeaves);
          setTeacherOneSections(res.data.sections);
          setTeacherOne(res.data);
        } catch (e) {
          console.log(e);
          toast.error("Error fetching Teacher Schedules");
        } finally {
          setRefreshSchedule(false);
        }
      };
      fetchTeacherSchedule();
    }
  }, [teacherOneId, refreshSchedule]);

  return (
    <>
      <SectionForm
        formState={formState}
        dispatchFormData={dispatchFormData}
        isUpdating={isUpdating}
        availTeacher={availTeacher}
        setAvailTeacher={setAvailTeacher}
        availVenues={availVenues}
        setAvailVenues={setAvailVenues}
        setTeacherOneId={setTeacherOneId}
        setTentitiveSection={setTentitiveSection}
        setRefreshSchedule={setRefreshSchedule}
      />
      <div className={styles.calendarContainer}>
        <ScheduleFullCalendar
          selectedTeacherId={teacherOneId}
          teacher={teacherOne}
          leaves={teacherOneLeaves}
          sections={teacherOneSections}
          tentitiveSection={tentitiveSection}
          initialView="timeGridWeek"
          initialDate={Date.now()}
          ref={calendarOneRef}
        />
      </div>
    </>
  );
};

export default CreateSectionTab;
