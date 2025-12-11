import axios from "axios";
import { RenderStatus, RenderButton, SetColumnMenu } from "../../utils/TableFuncs";
import Table from "./Table";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../api/api";

//dummy data
// const rows = [
//   {
//     id: 1,
//     courseCode: "CS101",
//     name: "Programming Fundamentals",
//     date: dayjs("2025-09-30").toISOString(),
//     timeslot: 1,
//     venueId: 10,
//     venue: "Room 101",
//     classSize: 30,
//     teacherId: 1,
//     teacher: "Bob",
//     remarks: 'Class test 1',
//     status: "confirmed",
//     button: "confirmed",
//   },
//   {
//     id: 2,
//     courseCode: "CS102",
//     name: "Object-Oriented Programming",
//     date: dayjs("2025-09-30").toISOString(),
//     timeslot: 1,
//     venueId: 11,
//     venue: "Lab 2",
//     classSize: 34,
//     teacherId: 2,
//     teacher: "Jim",
//     status: "cancelled",
//     button: "cancelled",
//   },
//   {
//     id: 3,
//     courseCode: "CS103",
//     name: "Data Structures and Algorithms",
//     date: dayjs("2025-09-30").toISOString(),
//     timeslot: 3,
//     venueId: 12,
//     venue: "Auditorium",
//     classSize: 30,
//     teacherId: 2,
//     teacher: "Jim",
//     status: "pending",
//     button: "pending",
//   },
// ];

const columns = [
  {
    field: "courseCode",
    headerName: "Code",
    headerClassName: "table-header",
    minWidth: 50,
    flex: 0.5,
    fontWeight: "bold",
  },
  { field: "name", 
    headerName: "Course", 
    headerClassName: "table-header", 
    minWidth: 200, 
    flex: 2, 
    fontWeight: "bold" },
  {
    field: "date",
    headerName: "Date",
    headerClassName: "table-header",
    minWidth: 100,
    flex: 1,
    valueFormatter: (value) => {
      return dayjs(value).format("DD-MMM-YYYY");
    },
  },
  {
    field: "timeslot",
    headerName: "Time",
    headerClassName: "table-header",
    minWidth: 10,
    flex: 1
  },
  { field: "venue", 
    headerName: "Venue", 
    headerClassName: "table-header", 
    minWidth: 100, 
    flex: 1 
  },

  { field: "classSize", 
    headerName: "Class Size", 
    headerClassName: "table-header", 
    minWidth: 100, 
    flex: 1 
  },

  { field: "teacher", 
    headerName: "Teacher", 
    headerClassName: "table-header", 
    minWidth: 100, 
    flex: 1 
  },

  { field: "remarks", 
    headerName: "Remarks", 
    headerClassName: "table-header", 
    minWidth: 100, 
    flex: 1 
  },

  {
    field: "status",
    headerName: "Status",
    headerClassName: "table-header",
    minWidth: 100,
    flex: 1,
    align: "center",
    renderCell: RenderStatus,
  },

  {
    field: "button",
    headerName: "",
    minWidth: 200,
    flex: 2,
    disableColumnMenu: true,
    sortable: false,
    filterable: false,
    renderCell: RenderButton,
    approvedBtnProps: [
      { name: "Edit Section", href: null, onclick },
      { name: "Cancel Section", href: null, onclick },
    ],
    rejectedBtnProps: [],
    pendingBtnProps: [
      { name: "Edit Section", href: null, onclick },
      { name: "Cancel Section", href: null, onclick },
    ],
    handleEditClick: "",
    handleCancelClick: "",
  },
];

//Main table component
const SectionTable = (props) => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
          const fetchSections = async () => {
            const res = await axios.get(`${BACKEND_URL}/api/sections/all`);
            const processedArr = [];

            res.data.forEach((section) => {
              const entry = new Object();
              entry.id = section.id;
              entry.courseCode = section.course.courseCode;
              entry.name = section.course.name;
              entry.date = section.date;
              entry.timeslot = section.timeslot.startTime.slice(0, -3) + ' - ' + section.timeslot.endTime.slice(0, -3);
              entry.venue = section.venue.name;
              entry.classSize = section.classSize;
              entry.teacher = section.teacher.firstName + ' ' + section.teacher.lastName;
              entry.remarks = section.description;
              entry.status = section.status.type;
              entry.button = section.status.type; 
            
              processedArr.push(entry);
            });
            
            setSections(processedArr);
          };
          fetchSections();
        }, []);

  //set handleEditClick func from SectionTabsBar to button props
  columns.find((col) => col.field == "button").handleEditClick = props.handleEditClick;
  columns.find((col) => col.field == "button").handleCancelClick = props.handleCancelClick;
  return (
    <div className="table">
      <h1 className="page-title">Section Overview</h1>
      <Table rows={sections} columns={columns} rowSpacingVals={[0, 30]} slots={{ columnMenu: SetColumnMenu }} />
    </div>
  );
};
export default SectionTable;
