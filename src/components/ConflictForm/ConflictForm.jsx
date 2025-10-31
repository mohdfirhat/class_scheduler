import { Box, Button, MenuItem, Stack, TextField, Typography } from "@mui/material";

const ConflictForm = ({ conflictLeave, formData, setFormData, conflictLessons, subTeachers }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (field) => (event) => {
    setFormData((oldForm) => ({ ...oldForm, [field]: event.target.value }));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        marginY: "1rem",
        p: 3,
        maxWidth: "90%",
        mx: "auto",
        display: "flex",
        flexDirection: "column", // optional row
        gap: 2,
        boxShadow: 2,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h6" textAlign="center" gutterBottom>
        Resolve Conflict
      </Typography>
      <Stack direction="row" gap="1rem">
        <TextField
          label="Teacher"
          value={`${conflictLeave.teacher.first_name} ${conflictLeave.teacher.last_name}`}
          disabled
          fullWidth
        />
        <TextField
          label="Leave Date(s)"
          value={`${conflictLeave.start_date} - ${conflictLeave.end_date}`}
          disabled
          fullWidth
        />
      </Stack>
      <Stack direction="row" gap="1rem">
        {/* selectedLessonId Input */}
        {conflictLessons.length > 0 && (
          <TextField
            select
            label="Conflicting Lesson"
            onChange={handleChange("selectedLessonId")}
            required
            fullWidth
            value={formData.selectedLessonId}
          >
            {conflictLessons.map((lesson) => (
              <MenuItem key={lesson.id} value={lesson.id}>
                {`${lesson.subject.subject_code} ${lesson.start_time.substring(11, 16)} - ${lesson.end_time.substring(
                  11,
                  16
                )}`}
              </MenuItem>
            ))}
          </TextField>
        )}
        {/* subTeacherId Input */}
        {subTeachers.length > 0 && (
          <TextField
            select
            label="Available Teacher(s)"
            onChange={handleChange("subTeacherId")}
            required
            fullWidth
            value={formData.subTeacherId}
          >
            {subTeachers.map((teacher) => (
              <MenuItem key={teacher.id} value={teacher.id}>
                {`${teacher.first_name} ${teacher.last_name}`}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Stack>
      <Stack direction="row" justifyContent="center" mt={2}>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Confirm Reassign
        </Button>
      </Stack>
    </Box>
  );
};
export default ConflictForm;
