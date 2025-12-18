import { useEffect, useReducer, useRef, useState } from "react";
import styles from "./CreateSectionTab.module.css";

import SectionForm from "../../components/SectionForm/SectionForm";
import dayjs from "dayjs";
import ScheduleFullCalendar from "../Calender/ScheduleFullCalendar";
import { BACKEND_URL } from "../../api/api";
import axios from "axios";
import toast from "react-hot-toast";

const defaultSection = {
  courseCode: "",
  remarks: "",
  classSize: "",
  date: dayjs(),
  timeslot: "",
  teacherId: "",
  venueId: "",
};
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

const CreateSectionTab = ({ sectionId, isUpdating }) => {
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
  const initState = { formData: defaultSection, validClassSize: true };
  const [formState, dispatchFormData] = useReducer(formReducerFunc, initState);

  const calendarOneRef = useRef(null);
  const [availTeacher, setAvailTeacher] = useState([]);
  const [availVenues, setAvailVenues] = useState([]);
  const [teacherOneId, setTeacherOneId] = useState(null);
  const [teacherOneLeaves, setTeacherOneLeaves] = useState([]);
  const [teacherOneSections, setTeacherOneSections] = useState([]);
  const [teacherOne, setTeacherOne] = useState(null);
  const [tentitiveSection, setTentitiveSection] = useState(defaultTentitiveSection);
  const [refreshSchedule, setRefreshSchedule] = useState(true);

  useEffect(() => {
    const calendarOneApi = calendarOneRef.current?.getApi();
    if (calendarOneApi) {
      const date = formState.formData.date ? new Date(formState.formData.date) : new Date();
      calendarOneApi.gotoDate(date);
    }
  }, [formState.formData.date]);

  // fetch teacher schedule(sections and leaves)
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
    //TODO: Firhat
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
