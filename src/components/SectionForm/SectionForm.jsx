import { useReducer, useEffect, useState } from "react";
import { Box, TextField, Button, MenuItem, Typography, Stack } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker, TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import VenuePopup from "../VenuePopup/VenuePopup";
import { courses, timeslots } from "../../fakedata/data";

const SectionForm = ({ teachers, venues, formData, setFormData, sectionId, isUpdating }) => {
  const [isComplete, setIsComplete] = useState(null);
  const [venueState, setVenueState] = useState(false);
  const initState = {formData: formData};
  
  const formReducerFunc = (prevState, action) =>{
      return {...prevState,
        formData: {
          ...prevState.formData,
          [action.type]: action.value,
        } 
      };
    
  };
  const [formState, dispatchFormData] = useReducer(formReducerFunc, initState);
  

  const handleChange = (field) => (event) => {
    // setFormData({ ...formData, [field]: event.target.value });
    dispatchFormData({type: field, value: event.target.value});
  };

  const handleDateChange = (newDate) => {
    if (!newDate) return;
    dispatchFormData({type: 'date', value: newDate.toISOString()});
    // setFormData({
    //   ...formData,
    //   date: newDate.toISOString(), // store as ISO
    // });
  };

  // const handleTimeChange = (field) => (newTime) => {
  //   if (!newTime) return;

  //   // Get the current date (if selected) or default to today
  //   const baseDate = formData.date ? dayjs(formData.date) : dayjs();

  //   // Combine date + time into a full ISO datetime
  //   const combined = baseDate.hour(newTime.hour()).minute(newTime.minute()).second(0).millisecond(0);

  //   setFormData({
  //     ...formData,
  //     [field]: combined.toISOString(),
  //   });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(isComplete);
    const {formData} = formState;
    //removing unneeded fields to prepare to send back to DB
    const {button, name, teacher, venue,... cleanedFormData} = formData;
    console.log("Submitted form data:", cleanedFormData);
    if (sectionId) {
      //TODO: update to section
    } else {
      // create section
    }
  };

  //Effect for checking if coursename, class size, date and timeslot are filled
  useEffect(()=>{
    // console.log(isComplete);
    const {formData} = formState;
    const {courseCode, classSize, date, timeslot, venueId} = formData;
    // console.log(date.length);
    if (courseCode.length == 0 || classSize.length == 0 || date.length == 0 || timeslot.length == 0){
      setIsComplete(false);}
    else {setIsComplete(true);}
  
    //for VenuePopup state
    if (venueId.toString().length > 0){setVenueState(true);}
    console.log('venue' + venueId.length);

    console.log(isComplete);
  }, [formState]);



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
            defaultValue={formData.courseCode}
            onChange={handleChange("courseCode")}
            required
            fullWidth
          >
            {courses.map((course) => (
              <MenuItem key={course.courseCode} value={course.courseCode}>
                {course.name}
              </MenuItem>
            ))}
          </TextField>
          
          {/* Class Size Input */}
          <TextField
            label="Class Size"
            type="number"
            slotProps={{htmlInput:{min: 1}}}
            defaultValue={formData.classSize}
            onChange={handleChange("classSize")}
            required
            fullWidth
            onKeyDown={(e) => {
              if (["-", "e"].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </Stack>
        
        <Stack>
          {/* Section Remarks Input */}
          <TextField
            label="Remarks"
            defaultValue={formData.remarks}
            onChange={handleChange("remarks")}
            //limit the no. of input characters to 50
            slotProps={{htmlInput:{maxLength: 50}}}
            multiline
            rows={1}
            fullWidth
          />
        </Stack>
        {/* Date + Time Pickers */}
        <Stack direction="row" spacing={2}>
          {/* Date on top */}
          <DatePicker
            label="Section Date"
            inputFormat="DD/MM/YYYY"
            value={formData.date ? dayjs(formData.date) : null}
            onChange={handleDateChange}
            slotProps={{ textField: { fullWidth: true, required: true } }}
          />

          {/* Timeslot Input */}
          <TextField
            select
            label="Timeslot"
            defaultValue={formData.timeslot}
            onChange={handleChange("timeslot")}
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
            defaultValue={formData.teacherId ? formData.teacherId : '' }
            onChange={handleChange("teacherId")}
            disabled={!isComplete}
            required
            fullWidth
           
          >
            {teachers.map((teacher) => (
              <MenuItem key={teacher.id} value={teacher.id}>
                {teacher.name}
              </MenuItem>
            ))}
          </TextField>
          {/* Venue Input */}
          <TextField
            select
            label="Venue"
            defaultValue={formData.venueId ? formData.venueId : ''}
            onChange={handleChange("venueId")}
            disabled={!isComplete}
            required
            fullWidth
            
          >
            {venues.map((venue) => (
              <MenuItem key={venue.id} value={venue.id}>
                {venue.name}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
        <VenuePopup formState = {formState} venueState = {venueState} sx={{ justifyContent: "center"}} formData={formData} venues={venues} />
        {/* Submit Button */}
        <Stack direction="row" justifyContent="center" mt={2}>
          <Button type="submit" variant="contained" sx={{backgroundColor: '#00838f',}}>
            {isUpdating ? "Edit" : "Create"} Section
          </Button>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
};
export default SectionForm;
