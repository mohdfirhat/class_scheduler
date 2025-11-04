import NavBar from "../components/NavBar/NavBar";
import LessonTabsBar from "../components/LessonTabsBar"; 
import Footer from "../components/Footer";
import Box from '@mui/material/Box';

const LessonOverviewPage = () => {
  return (
    <Box sx={{display: 'flex',flexDirection: 'column',minHeight: '100vh'}}>
      <NavBar />
      <Box sx= {{flexGrow: 1}}>
        <LessonTabsBar />
      </Box>
      <Footer />
    </Box>
  );
};
export default LessonOverviewPage;
