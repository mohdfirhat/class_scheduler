import { Box, TextField, Button, MenuItem, Typography, Stack } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker, TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const LessonForm = ({ teachers, venues, formData, setFormData, lessonId }) => {
  const handleChange = (field) => (event) => {
    console.log(event.target.value);
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
          {lessonId ? "Update" : "Create"} Lesson
        </Typography>

        {/* Name + Description */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Stack direction="column" spacing={2} gap="1.2rem">
            {/* Lesson Name Input */}
            <TextField label="Lesson Name" value={formData.name} onChange={handleChange("name")} required fullWidth />
            {/* Lesson Name Input */}
            <TextField
              label="Class Size"
              value={formData.classSize}
              onChange={handleChange("classSize")}
              required
              fullWidth
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
        </Stack>

        {/* Date + Time Pickers */}
        <Stack direction="column" spacing={2}>
          {/* Date on top */}
          <DatePicker
            label="Lesson Date"
            inputFormat="DD/MM/YYYY"
            value={formData.date ? dayjs(formData.date) : null}
            onChange={handleDateChange}
            slotProps={{ textField: { fullWidth: true, required: true } }}
          />

          {/* Start + End Time side by side */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TimePicker
              label="Start Time"
              value={formData.startTime ? dayjs(formData.startTime) : null}
              onChange={handleTimeChange("startTime")}
              slotProps={{ textField: { fullWidth: true, required: true } }}
            />

            <TimePicker
              label="End Time"
              value={formData.endTime ? dayjs(formData.endTime) : null}
              onChange={handleTimeChange("endTime")}
              slotProps={{ textField: { fullWidth: true, required: true } }}
            />
          </Stack>
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
