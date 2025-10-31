import { Padding } from "@mui/icons-material";
import LeaveTable from "../components/LeaveTable";
import NavBar from "../components/NavBar/NavBar";

//Main table component
const LeaveOverviewPage = ()=>{
    return (
        <div className = 'page' >
            <NavBar />
            <LeaveTable/>
        </div>
    )

}
export default LeaveOverviewPage;