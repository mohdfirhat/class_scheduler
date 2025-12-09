import axios from "axios";
import { SetColumnMenu } from "../../utils/TableFuncs";
import Table from "./Table";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../api/api";
import { useParams } from "react-router";

//dummy data
const rows = [
  {
    id: "CS101",
    name: "Programming Fundamentals",
    department: "Computer Science",
    description: "Introduction class to Programming Fundamentals",
  },
  {
    id: "CS102",
    name: "Object-Oriented Programming",
    department: "Computer Science",
    description: "Basics of Object Oriented Programming",
  },
  {
    id: "CS103",
    name: "Data Structures and Algorithms",
    department: "Computer Science",
    description: "Basics of Data Structures and Algorithms",
  },
];

const columns = [
  {
    field: "courseCode",
    headerName: "Course code",
    headerClassName: "table-header",
    minWidth: 100,
    flex: 1,
    fontWeight: "bold",
  },
  { field: "department", headerName: "Department", headerClassName: "table-header", minWidth: 100, flex: 1 },
  { field: "name", headerName: "Name", headerClassName: "table-header", minWidth: 200, flex: 2, fontWeight: "bold" },
  //   { field: "description", headerName: "Description", headerClassName: "table-header", minWidth: 300, flex: 3 },
];

//Main table component
const CourseTable = (props) => {
  //   const { departmentId } = useParams();
  const departmentId = 1;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get(`${BACKEND_URL}/api/courses/${departmentId}`);
      console.log(res.data);
      setCourses(res.data);
    };
    fetchCourses();
  }, []);

  return (
    <div className="table">
      <h1 className="page-title">Course Overview</h1>
      <Table rows={courses} columns={columns} rowSpacingVals={[0, 30]} slots={{ columnMenu: SetColumnMenu }} />
    </div>
  );
};
export default CourseTable;
