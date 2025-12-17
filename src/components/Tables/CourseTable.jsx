import axios from "axios";
import { SetColumnMenu } from "../../utils/TableFuncs";
import Table from "./Table";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../api/api";
import Box from '@mui/material/Box';

//Column properties and formatting to be passed to DataGrid in the Table component
const columns = [
  {
    field: "courseCode",
    headerName: "Course code",
    headerClassName: "table-header",
    minWidth: 100,
    flex: 1,
    fontWeight: "bold",
  },
  {
    field: "department",
    headerName: "Department",
    headerClassName: "table-header",
    minWidth: 100,
    flex: 1,
    valueGetter: (value, row) => {
      return `${row.department.name}`;
    },
  },
  { field: "name", headerName: "Name", headerClassName: "table-header", minWidth: 200, flex: 2, fontWeight: "bold" },
  {
    field: "description",
    headerName: "Description",
    headerClassName: "table-header",
    minWidth: 300,
    flex: 3,
  },
];

//Main table component
const CourseTable = (props) => {

  //department hard coded to id 1 
  const departmentId = 1;
  const [courses, setCourses] = useState([]);

  //useEffect for fetching all course data on page load 
  //and sending data to DataGrid in Table component
  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get(`${BACKEND_URL}/api/courses/${departmentId}`);
      setCourses(res.data);
    };
    fetchCourses();
  }, []);

  return (
    <div className="table">
      <h1 className="page-title">Course Overview</h1>
      <Table 
        rows={courses} 
        columns={columns} 
        rowSpacingVals={[0, 30]} 
        slots={{ 
                columnMenu: SetColumnMenu,
                noRowsOverlay: ()=><Box p={5}>No courses to display</Box>, 
              }}
      />
    </div>
  );
};
export default CourseTable;
