import { Box, TextField, Button, MenuItem, Typography, Stack } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker, TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import VenuePopup from "../VenuePopup/VenuePopup";
import { AlignHorizontalCenter } from "@mui/icons-material";
import { courses, timeslots } from "../../fakedata/data";

const LessonForm = ({ teachers, venues, formData, setFormData, lessonId, isUpdating }) => {
  const handleChange = (field) => (event) => {
    console.log(field);
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleDateChange = (newDate) => {
    if (!newDate) return;
    setFormData({
      ...formData,
      date: newDate.toISOString(), // store as ISO
    });
  };

  const handleTimeChange = (field) => (newTime) => {
    if (!newTime) return;

    // Get the current date (if selected) or default to today
    const baseDate = formData.date ? dayjs(formData.date) : dayjs();

    // Combine date + time into a full ISO datetime
    const combined = baseDate.hour(newTime.hour()).minute(newTime.minute()).second(0).millisecond(0);

    setFormData({
      ...formData,
      [field]: combined.toISOString(),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted form data:", formData);

    if (lessonId) {
      //TODO: update to lesson
    } else {
      // create lesson
    }
  };
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
          {isUpdating ? "Edit" : "Create"} Lesson
        </Typography>

        {/* Name + Description */}

        <Stack direction="row" spacing={2}>
          {/* Lesson Name Input */}
          <TextField
            select
            label="Course Name"
            value={formData.courseCode}
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
            value={formData.classSize}
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
        {/* Lesson Description Input */}
        <TextField
          label="Description"
          value={formData.description}
          onChange={handleChange("description")}
          multiline
          rows={5}
          fullWidth
        />

        {/* Date + Time Pickers */}
        <Stack direction="row" spacing={2}>
          {/* Date on top */}
          <DatePicker
            label="Lesson Date"
            inputFormat="DD/MM/YYYY"
            value={formData.date ? dayjs(formData.date) : null}
            onChange={handleDateChange}
            slotProps={{ textField: { fullWidth: true, required: true } }}
          />

          {/* Timeslot Input */}
          <TextField
            select
            label="Timeslot"
            value={formData.timeslot}
            onChange={handleChange("timeslot")}
            required
            fullWidth
          >
            {timeslots.map((timeslot) => (
              <MenuItem key={timeslot.id} value={timeslot.id}>
                {`${timeslot.startTime.substring(0, 5)}-${timeslot.endTime.substring(0, 5)}`}
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
            value={formData.teacherId}
            onChange={handleChange("teacherId")}
            required
            fullWidth
            defaultValue={teachers[0].id}
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
            value={formData.venueId}
            onChange={handleChange("venueId")}
            required
            fullWidth
            defaultValue={venues[0].id}
          >
            {venues.map((venue) => (
              <MenuItem key={venue.id} value={venue.id}>
                {venue.name}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
        <VenuePopup sx={{ justifyContent: "center" }} formData={formData} venues={venues} />
        {/* Submit Button */}
        <Stack direction="row" justifyContent="center" mt={2}>
          <Button type="submit" variant="contained" color="primary">
            {lessonId ? "Update" : "Create"} Lesson
          </Button>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
};
export default LessonForm;
