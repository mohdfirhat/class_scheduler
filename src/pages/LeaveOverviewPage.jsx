import LeaveTable from "../components/Tables/LeaveTable";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer";
import Box from '@mui/material/Box';
import './pages.css'

const LeaveOverviewPage = ()=>{
    return (
    <Box sx={{display: 'flex',flexDirection: 'column',minHeight: '100vh'}}>
      <NavBar />
      <h1 className="page-title">Leave Overview</h1>
      <Box sx= {{flexGrow: 1}}>
        <LeaveTable />
      </Box>
      <Footer/>
    </Box>
    );
}
export default LeaveOverviewPage;