import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import LessonTable from "../components/Tables/LessonTable";
import CreateLessonPage from '../pages/CreateLessonPage/CreateLessonPage';
import { Home, Update, Add } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
        main: '#00838f',
    },
},
});

function CustomTabPanel(props) {
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
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function LessonTabsBar() {
  const [value, setValue] = React.useState(0);
  const [isUpdating, setisUpdating] = React.useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'transparent',  px: '1%' }}>
        <ThemeProvider theme = {theme}>
        <Tabs value={value} onChange={handleChange} aria-label="Tabs panel" textColor ='primary' indicatorColor='primary'>
          <Tab icon = {<Home/>} iconPosition="end" label="Lesson Overview" {...a11yProps(0)} />
          <Tab icon = {<Add/>} iconPosition="end" label="Create Lesson" {...a11yProps(1)} />
          <Tab icon = {<Update/>} iconPosition="end" label="Update Lesson" disabled={!isUpdating} {...a11yProps(2)} />
        </Tabs>
        </ThemeProvider>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <LessonTable/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CreateLessonPage />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CreateLessonPage />
      </CustomTabPanel>
    </Box>
  );
}