import LeaveTable from "../components/Tables/LeaveTable";
import NavBar from "../components/NavBar/NavBar";

const LeaveOverviewPage = ()=>{
    return (
    <>
      <NavBar />
      <h1>Leave Overview</h1>
      <LeaveTable/>
    </>
    );
}
export default LeaveOverviewPage;