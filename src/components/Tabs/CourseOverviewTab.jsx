import NavBar from "../NavBar/NavBar";
import SectionTabsBar from "../CourseTabsBar"; 
import Footer from "../Footer";
import Box from '@mui/material/Box';

const CourseOverviewTab = () => {
  return (
    <Box sx={{display: 'flex',flexDirection: 'column',minHeight: '100vh'}}>
      <NavBar />
      <Box sx= {{flexGrow: 1}}>
        <SectionTabsBar />
      </Box>
      <Footer />
    </Box>
  );
};
export default CourseOverviewTab;
