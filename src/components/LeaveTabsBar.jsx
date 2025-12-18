import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SectionTable from "./Tables/SectionTable";
import LeaveTable from "../components/Tables/LeaveTable";
import CourseTable from "./Tables/CourseTable";
import CreateSectionTab from "./Tabs/CreateSectionTab";
import { Done, Pending, FlightTakeoff } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// variable to set the MUI Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#00838f",
    },
  },
});

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

//Main table component
//Component used to render sub tabs in the Course Tab
const CourseTabsBar = () => {
  const [value, setValue] = React.useState(0);

  //handler used to render tab whenever a tab is selected
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "transparent", px: "1%" }}>
        <ThemeProvider theme={theme}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Tabs panel"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab icon={<FlightTakeoff />} iconPosition="end" label="Leave Overview" {...a11yProps(0)} />
            <Tab icon={<Pending />} iconPosition="end" label="Pending Leaves" {...a11yProps(1)} />
            <Tab icon={<Done />} iconPosition="end" label="Approved/Rejected Leaves" {...a11yProps(2)} />
          </Tabs>
        </ThemeProvider>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <LeaveTable table="all" title="Leave Overview" />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <LeaveTable table="pending" title="Pending Leaves" />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <LeaveTable table="nonPending" title="Approved/Rejected Leaves" />
      </CustomTabPanel>
    </Box>
  );
};

export default CourseTabsBar;
