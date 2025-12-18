import NavBar from "../NavBar/NavBar";
import CourseTabsBar from "../CourseTabsBar";
import Footer from "../Footer";
import Box from "@mui/material/Box";
import { useEffect } from "react";

//Component for rendering sub tabs in Course tab
const CourseOverviewTab = () => {
  // change document title on new page
  useEffect(() => {
    document.title = "Course | Lesson Scheduler";
  }, []);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <NavBar />
      <Box sx={{ flexGrow: 1 }}>
        <CourseTabsBar />
      </Box>
      <Footer />
    </Box>
  );
};
export default CourseOverviewTab;
