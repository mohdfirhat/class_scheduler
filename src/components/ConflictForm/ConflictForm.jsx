import { Box, Button, MenuItem, Stack, TextField, Typography } from "@mui/material";

const ConflictForm = ({ conflictLeave, formData, setFormData, conflictSectionsAndTeachers }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  console.log("conflictLeave");
  console.log(conflictLeave);
  console.log(conflictSectionsAndTeachers);

  const handleChange = (field) => (event) => {
    setFormData((oldForm) => ({
      ...oldForm,
      [field]: event.target.value,
      ...(field === "selectedSectionId" ? { subTeacherId: "" } : {}),
    }));
  };

  // Extract conflictingLessons
  const conflictSections = conflictSectionsAndTeachers.map(({ availableTeachers, ...section }) => section);
  console.log("conflictSections");
  console.log(conflictSections);

  // Extract availableTeachers
  // const availableTeachers = conflictSectionsAndTeachers.map((lesson) => lesson.availableTeachers);
  const availableTeachers = formData.selectedSectionId
    ? conflictSectionsAndTeachers.find((lesson) => lesson.id == formData.selectedSectionId).availableTeachers
    : [];
  console.log("availableTeachers");
  console.log(availableTeachers);

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
          value={conflictLeave ? `${conflictLeave.teacher.firstName} ${conflictLeave.teacher.lastName}` : ""}
          disabled
          fullWidth
        />

        <TextField
          label="Leave Date(s)"
          value={conflictLeave ? `${conflictLeave.startDate} - ${conflictLeave.endDate}` : ""}
          disabled
          fullWidth
        />
      </Stack>

      <Stack direction="row" gap="1rem">
        {/* selectedSectionId Input */}
        <TextField
          select
          label="Conflicting Section"
          onChange={handleChange("selectedSectionId")}
          required={conflictSections.length > 0}
          fullWidth
          disabled={conflictSections.length === 0}
          value={formData.selectedSectionId || ""} // ✅ always defined
        >
          <MenuItem key="empty" value=""></MenuItem>

          {conflictSections.map((section) => (
            <MenuItem key={section.id} value={section.id}>
              {`${section.course.courseCode} ${section.timeslot.startTime.substring(
                0,
                5
              )} - ${section.timeslot.endTime.substring(0, 5)}`}
            </MenuItem>
          ))}
        </TextField>

        {/* subTeacherId Input */}
        <TextField
          select
          label="Available Teacher(s)"
          onChange={handleChange("subTeacherId")}
          required={availableTeachers.length > 0}
          disabled={availableTeachers.length === 0}
          fullWidth
          value={formData.subTeacherId || ""} // ✅ always defined
        >
          <MenuItem key={0} value=""></MenuItem>

          {availableTeachers.map((teacher) => (
            <MenuItem key={teacher.id} value={teacher.id}>
              {`${teacher.firstName} ${teacher.lastName}`}
            </MenuItem>
          ))}
        </TextField>
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
