import NavBar from "../NavBar/NavBar";
import CourseTabsBar from "../CourseTabsBar"; 
import Footer from "../Footer";
import Box from '@mui/material/Box';

//Component for rendering sub tabs in Course tab
const CourseOverviewTab = () => {
  return (
    <Box sx={{display: 'flex',flexDirection: 'column',minHeight: '100vh'}}>
      <NavBar />
      <Box sx= {{flexGrow: 1}}>
        <CourseTabsBar />
      </Box>
      <Footer />
    </Box>
  );
};
export default CourseOverviewTab;
