import { Box, TextField, Button, MenuItem, Typography, Stack } from "@mui/material";

const LessonForm = ({ teachers, venues, formData, setFormData, lessonId }) => {
  const handleChange = (field) => (event) => {
    console.log(event.target.value);
    setFormData({ ...formData, [field]: event.target.value });
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
        Create / Update Lesson
      </Typography>

      {/* Name + Description */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        {/* Lesson Name Input */}
        <TextField label="Lesson Name" value={formData.name} onChange={handleChange("name")} required fullWidth />
        {/* Lesson Description Input */}
        <TextField
          label="Description"
          value={formData.description}
          onChange={handleChange("description")}
          multiline
          rows={3}
          fullWidth
        />
      </Stack>

      {/* Start + End Time */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        {/* Start Time Input */}
        <TextField
          label="Start Time"
          type="datetime-local"
          value={formData.startTime}
          onChange={handleChange("startTime")}
          required
          fullWidth
        />
        {/* End Time Input */}
        <TextField
          label="End Time"
          type="datetime-local"
          value={formData.endTime}
          onChange={handleChange("endTime")}
          required
          fullWidth
        />
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
          Save Lesson
        </Button>
      </Stack>
    </Box>
  );
};
export default LessonForm;
