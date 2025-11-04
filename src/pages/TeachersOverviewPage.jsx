import NavBar from "../components/NavBar/NavBar";
import TeacherTable from "../components/Tables/TeacherTable";
import Footer from "../components/Footer";
import Box from '@mui/material/Box';

const TeachersOverviewPage = () => {
  return (
    <Box sx={{display: 'flex',flexDirection: 'column',minHeight: '100vh'}}>
      <NavBar />
      <Box sx= {{flexGrow: 1}}>
        <h1 className="page-title">Teacher Overview</h1>
        <TeacherTable/>
      </Box>
      <Footer />
    </Box>
  );
};
export default TeachersOverviewPage;
