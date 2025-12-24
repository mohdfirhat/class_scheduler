import LeaveTable from "../components/Tables/LeaveTable";
import LeaveTabsBar from "../components/LeaveTabsBar";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer";
import Box from "@mui/material/Box";
import "./pages.css";
import { useEffect } from "react";

const LeaveOverviewPage = () => {
  // change document title on new page
  useEffect(() => {
    document.title = "Leaves | Lesson Scheduler";
  }, []);
  
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <NavBar />
      <LeaveTabsBar />
      <Box sx={{ flexGrow: 1 }}></Box>
      <Footer />
    </Box>
  );
};
export default LeaveOverviewPage;
