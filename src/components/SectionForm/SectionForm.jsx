import { useEffect, useState } from "react";
import { Box, TextField, Button, MenuItem, Typography, Stack } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import VenuePopup from "../VenuePopup/VenuePopup";
import axios from "axios";
import { BACKEND_URL } from "../../api/api";
import toast from "react-hot-toast";

const SectionForm = ({
  formState,
  dispatchFormData,
  // sectionId,
  isUpdating,
  availTeacher,
  setAvailTeacher,
  availVenues,
  setAvailVenues,
  setTeacherOneId,
  setTentitiveSection,
  setRefreshSchedule,
}) => {
  const [isBasicParamsFilled, setIsBasicParamsFilled] = useState(false);
  const [isVenueFilled, setIsVenueFilled] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [courses, setCourses] = useState([]);
  const [timeslots, setTimeslots] = useState([]);

  const departmentId = 1;
  const managerId = 1;

  const handleChange = (field) => (event) => {
    dispatchFormData({ type: field, value: event.target.value });
    if (field == "courseCode") {
      setTentitiveSection((prevState) => ({
        ...prevState,
        course: courses.find((course) => course.id == event.target.value),
      }));
    }
    if (field == "venueId") {
      setTentitiveSection((prevState) => ({
        ...prevState,
        venue: availVenues.find((venue) => venue.id == event.target.value),
      }));
    }
    if (field == "timeslot") {
      setTentitiveSection((prevState) => ({
        ...prevState,
        timeslot: timeslots.find((timeslot) => timeslot.id == event.target.value),
      }));
    }
  };

  const handleDateChange = (newDate) => {
    if (!newDate) return;
    dispatchFormData({ type: "date", value: newDate });
    setTentitiveSection((prevState) => ({ ...prevState, date: newDate }));
  };

  const handleSubmit = async (event) => {
    // prevent refresh of page
    event.preventDefault();

    const { formData } = formState;

    // creating section Object for POST
    const sectionObject = {
      remark: formData.remarks,
      date: formData.date.format("YYYY-MM-DD"),
      classSize: formData.classSize,
      timeslotId: formData.timeslot,
      venueId: formData.venueId,
      courseId: formData.courseCode,
      teacherId: formData.teacherId,
    };

    // creating section Object
    const toastId = toast.loading("Creating Section...");
    try {
      await axios.post(`${BACKEND_URL}/api/sections`, sectionObject);
      toast.dismiss(toastId);
      toast.success("Successfully Created Section");
      setRefreshSchedule(true);
    } catch (e) {
      console.log(e);
      toast.dismiss(toastId);
      toast.error(e.response.data);
    }
  };

  //Effect for checking if coursename, class size, date and timeslot are filled
  useEffect(() => {
    const { formData } = formState;
    const { courseCode, classSize, date, timeslot } = formData;
    if (courseCode.length == 0 || classSize.length == 0 || date.length == 0 || timeslot.length == 0) {
      setIsBasicParamsFilled(false);
    } else {
      setIsBasicParamsFilled(true);
    }
  }, [formState]);

  //If current implementation is too laggy, find use-debounce and use debounce

  //Effect to check if all mandatory fields in form are filled
  useEffect(() => {
    const { formData } = formState;
    const { courseCode, classSize, date, timeslot, teacherId, venueId } = formData;

    //check if venue slot is filled and set state to enable/disable VenuePopup
    if (venueId.toString().length != 0) {
      setIsVenueFilled(true);
    } else {
      setIsVenueFilled(false);
    }

    if (teacherId.toString().length != 0) {
      true;
      setTeacherOneId(teacherId);
    } else {
      setTeacherOneId(null);
    }

    if (
      courseCode.length == 0 ||
      classSize.length == 0 ||
      date.length == 0 ||
      timeslot.length == 0 ||
      teacherId.toString().length == 0 ||
      venueId.toString().length == 0 ||
      !formState.validClassSize
    ) {
      setIsFormComplete(false);
    } else {
      setIsFormComplete(true);
    }
  }, [formState]);

  //fetch the available teachers and venues after basic params filled
  useEffect(() => {
    if (isBasicParamsFilled) {
      const fetchAvailableTeachersWithSchedule = async () => {
        const url = new URL(`${BACKEND_URL}/api/teachers/${managerId}/available`);
        url.searchParams.append("date", formState.formData.date.format("YYYY-MM-DD"));
        url.searchParams.append("timeslotId", formState.formData.timeslot);
        url.searchParams.append("courseId", formState.formData.courseCode);
        try {
          const res = await axios.get(url.href);
          setAvailTeacher(res.data);
        } catch (e) {
          console.log(e);
          toast.error("Error fetching available teachers");
        }
      };

      const fetchAvailableVenues = async () => {
        const url = new URL(`${BACKEND_URL}/api/venues`);
        url.searchParams.append("date", formState.formData.date.format("YYYY-MM-DD"));
        url.searchParams.append("timeslotId", formState.formData.timeslot);
        url.searchParams.append("classSize", formState.formData.classSize);
        try {
          const res = await axios.get(url.href);
          setAvailVenues(res.data);
        } catch (e) {
          console.log(e);
          toast.error("Error fetching available venues");
        }
      };

      fetchAvailableTeachersWithSchedule();
      fetchAvailableVenues();
    }
  }, [isBasicParamsFilled, formState]);

  //fetch the course name based on department Id
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/courses/${departmentId}`);
        setCourses(res.data);
      } catch (e) {
        toast.error(e.response.data);
      }
    };
    const fetchTimeslots = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/timeslots`);
        setTimeslots(res.data);
      } catch (e) {
        toast.error(e.response.data);
      }
    };
    fetchCourses();
    fetchTimeslots();
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          marginY: "1rem",
          p: 3,
          maxWidth: "80%",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          boxShadow: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h6" textAlign="center" gutterBottom>
          {isUpdating ? "Edit" : "Create"} Section
        </Typography>

        {/* Name + Description */}
        <Stack direction="row" spacing={2}>
          {/* Section Name Input */}
          <TextField
            select
            label="Course Name"
            defaultValue={formState.formData.courseCode}
            onChange={handleChange("courseCode")}
            error={formState.formData.courseCode == ""}
            id="outlined-error"
            helperText={formState.formData.courseCode == "" ? "Field required" : ""}
            required
            fullWidth
          >
            {courses.map((course) => (
              <MenuItem key={course.courseCode} value={course.id}>
                {course.name}
              </MenuItem>
            ))}
          </TextField>

          {/* Class Size Input */}
          <TextField
            label="Class Size"
            type="number"
            slotProps={{ htmlInput: { min: 1 } }}
            defaultValue={formState.formData.classSize}
            onChange={handleChange("classSize")}
            error={!formState.validClassSize || formState.formData.classSize == ""}
            id="outlined-error"
            helperText={formState.validClassSize ? "" : "Invalid class size."}
            required
            fullWidth
            onKeyDown={(e) => {
              if (["-", "e", ".", "+"].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </Stack>

        <Stack>
          {/* Section Remarks Input */}
          <TextField
            label="Remarks"
            placeholder="E.g. Class Test 1, Group Presentation Day "
            // defaultValue={formState.formData.remarks}
            value={formState.formData.remarks}
            onChange={handleChange("remarks")}
            //limit the no. of input characters to 50
            slotProps={{ htmlInput: { maxLength: 50 } }}
            multiline
            rows={1}
            fullWidth
          />
        </Stack>
        {/* Date + Timeslot Pickers */}
        <Stack direction="row" spacing={2}>
          {/* Date on top */}
          <DatePicker
            label="Section Date"
            inputFormat="DD/MM/YYYY"
            // defaultValue={formState.formData.date ? dayjs(formState.formData.date) : null}
            value={formState.formData.date ? dayjs(formState.formData.date) : null}
            onChange={handleDateChange}
            slotProps={{ textField: { fullWidth: true, required: true } }}
          />

          {/* Timeslot Input */}
          <TextField
            select
            label="Timeslot"
            // defaultValue={formState.formData.timeslot}
            value={formState.formData.timeslot}
            onChange={handleChange("timeslot")}
            error={formState.formData.timeslot == ""}
            id="outlined-error"
            helperText={formState.formData.timeslot == "" ? "Field required" : ""}
            required
            fullWidth
          >
            {timeslots.map((timeslot) => (
              <MenuItem key={timeslot.id} value={timeslot.id}>
                {`${timeslot.startTime.substring(0, 5)} - ${timeslot.endTime.substring(0, 5)}`}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        {/* Teacher + Venue */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          {/* Teacher Input */}
          <TextField
            select
            label="Teacher"
            // defaultValue={formState.formData.teacherId ? formState.formData.teacherId : ""}
            value={formState.formData.teacherId ? formState.formData.teacherId : ""}
            onChange={handleChange("teacherId")}
            error={formState.formData.teacherId == "" && isBasicParamsFilled}
            id="outlined-error"
            helperText={formState.formData.teacherId == "" ? "Field required" : ""}
            disabled={!isBasicParamsFilled}
            required
            fullWidth
          >
            {availTeacher.map((teacher) => (
              <MenuItem key={teacher.id} value={teacher.id}>
                {teacher.firstName} {teacher.lastName}
              </MenuItem>
            ))}
          </TextField>
          {/* Venue Input */}
          <TextField
            select
            label="Venue"
            // defaultValue={formState.formData.venueId ? formState.formData.venueId : ""}
            value={formState.formData.venueId ? formState.formData.venueId : ""}
            onChange={handleChange("venueId")}
            error={formState.formData.venueId == "" && isBasicParamsFilled}
            id="outlined-error"
            helperText={formState.formData.venueid == "" ? "Field required" : ""}
            disabled={!isBasicParamsFilled}
            required
            fullWidth
          >
            {availVenues.map((venue) => (
              <MenuItem key={venue.id} value={venue.id}>
                {venue.name}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
        <VenuePopup
          venues={availVenues}
          isVenueFilled={isVenueFilled}
          formState={formState}
          sx={{ justifyContent: "center" }}
        />
        {/* Submit Button */}
        <Stack direction="row" justifyContent="center" mt={2}>
          <Button type="submit" variant="contained" disabled={!isFormComplete} sx={{ backgroundColor: "#00838f" }}>
            {isUpdating ? "Edit" : "Create"} Section
          </Button>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
};
export default SectionForm;
