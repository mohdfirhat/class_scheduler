import axios from "axios";
import { RenderStatus, RenderButton, SetColumnMenu } from "../../utils/TableFuncs";
import Table from "./Table";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../api/api";
import toast from "react-hot-toast";
import Box from '@mui/material/Box';

//Column properties and formatting to be passed to DataGrid in the Table component
const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    minWidth: 50,
    flex: 0.5,
    fontWeight: "bold",
  },
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
      { name: "Cancel Section", href: null, onclick },
    ],
    rejectedBtnProps: [],
    pendingBtnProps: [
      {name: 'Approve', href: null, onclick },
      { name: "Cancel Section", href: null, onclick },
    ]
  }
];

//Main table component
const SectionTable = (props) => {
  //State used for "saving" section data
  const [sections, setSections] = useState([]);

  //state used to save the details of the latest update, used to rerender table data to reflect changes
  const [latestUpdate, setLatestUpdate] = useState([]);

  //handler(s) for table buttons defined here to be passed down to DataGrid via props
  const handleApproveClick = async (rowData) => {
        try {
            const res = await axios.put(`${BACKEND_URL}/api/sections/approve/${rowData.id}`);
            toast.success(res.data,{position: 'top-center',});
            setLatestUpdate(res.data);

        } catch (error){
            toast.error(error.response.data,{position: 'top-center',});
        }
    };
    const handleCancelClick = async (rowData) => {
        try {
            const res = await axios.put(`${BACKEND_URL}/api/sections/cancel/${rowData.id}`);
            toast.success(res.data,{position: 'top-center',});
            setLatestUpdate(res.data);

        } catch (error){
            toast.error(error.response.data,{position: 'top-center',});
        }    
    };
    const handleApprovedCancelClick = async (rowData) => {
        try {
            const res = await axios.put(`${BACKEND_URL}/api/sections/cancelApproved/${rowData.id}`);
            toast.success(res.data,{position: 'top-center',});
            setLatestUpdate(res.data);

        } catch (error){
            toast.error(error.response.data,{position: 'top-center',});
        }    
    };
  
  // useEffect for retrieving all section records on page load
  //and sending data to DataGrid in Table component
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/sections`);
        const processedArr = [];

        //useEffect receives section data, and modifies it to suit the columns 
        //in SectionTable
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
      } catch (error){
      toast.error(error.response.data,{position: 'top-center',});
      }
    };
    fetchSections();
  }, [latestUpdate]);

  return (
    <div className="table">
      <h1 className="page-title">Section Overview</h1>
      <Table 
        rows={sections} 
        columns={columns} 
        rowSpacingVals={[0, 30]} 
        slots={{ 
                columnMenu: SetColumnMenu,
                noRowsOverlay: ()=><Box p={5}>No sections to display</Box>, 
              }}
        initialState={{
              sorting: {
                        sortModel: [{ field: 'status', sort: 'desc' }],
              },      
              pagination: {
                  paginationModel: { pageSize: 25, page: 0 },
              },
                      }}
        handleApproveClick = {handleApproveClick}
        handleApprovedCancelClick = {handleApprovedCancelClick}
        handleCancelClick = {handleCancelClick} 
      />
    </div>
  );
};
export default SectionTable;
