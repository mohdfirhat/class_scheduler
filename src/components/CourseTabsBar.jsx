import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SectionTable from "./Tables/SectionTable";
import CourseTable from "./Tables/CourseTable";
import CreateSectionTab from "./Tabs/CreateSectionTab";
import { Update, Add, People, MenuBook } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const CourseTabsBar = () => {
  const [value, setValue] = React.useState(0);
  const [isUpdating, setisUpdating] = React.useState(false);
  const [sectionId, setSectionId] = React.useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue != 3) {
      setisUpdating(false);
    }
  };
  const handleEditClick = (props) => {
    setisUpdating(true);
    setValue(3);
    setSectionId(props.id);
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
            <Tab icon={<MenuBook />} iconPosition="end" label="Course Overview" {...a11yProps(0)} />
            <Tab icon={<People />} iconPosition="end" label="Section Overview" {...a11yProps(1)} />
            <Tab icon={<Add />} iconPosition="end" label="Create Section" {...a11yProps(2)} />
            <Tab icon={<Update />} iconPosition="end" label="Edit Section" disabled={!isUpdating} {...a11yProps(3)} />
          </Tabs>
        </ThemeProvider>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CourseTable />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SectionTable handleEditClick={handleEditClick} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CreateSectionTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <CreateSectionTab sectionId={sectionId} isUpdating={isUpdating} />
      </CustomTabPanel>
    </Box>
  );
};

export default CourseTabsBar;
