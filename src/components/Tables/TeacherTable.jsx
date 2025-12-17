import axios from "axios";
import { RenderButton, SetColumnMenu, RenderAvatar, rowSpanValueFunc } from '../../utils/TableFuncs';
import Table from './Table'
import { useEffect, useState } from "react";;
import { BACKEND_URL } from "../../api/api";
import { useNavigate } from "react-router";
import Box from '@mui/material/Box';

//Column properties and formatting to be passed to DataGrid in the Table component
const columns = [
    { field: 'avatar', 
        headerName: '', 
        headerClassName:'table-header', 
        minWidth: 100, 
        flex: 1, 
        disableColumnMenu: true, 
        sortable: false, 
        renderCell: RenderAvatar, 
        rowSpanValueGetter: rowSpanValueFunc},

    { field: 'firstName', 
        headerName: 'First Name', 
        headerClassName:'table-header', 
        minWidth: 150, 
        flex: 1.5, 
        rowSpanValueGetter: rowSpanValueFunc },

    { field: 'lastName', 
        headerName: 'Last Name', 
        headerClassName:'table-header', 
        minWidth: 150, 
        flex: 1.5, 
        rowSpanValueGetter: rowSpanValueFunc },

    { field: 'department', 
        headerName: 'Department', 
        headerClassName:'table-header', 
        minWidth: 150, 
        flex: 1.5, 
        valueGetter: (value, row) => {
            return `${row.department.name}`;
        },
        rowSpanValueGetter: rowSpanValueFunc},

    { field: 'courses', 
        headerName: 'Course(s) Taught', 
        headerClassName:'table-header', 
        minWidth: 100, flex: 1.5 , 
        rowSpanValueGetter: rowSpanValueFunc},

    { field: 'email', 
        headerName: 'Email', 
        headerClassName:'table-header', 
        minWidth: 150, flex: 1.5 , 
        rowSpanValueGetter: rowSpanValueFunc},

    { field: 'leaveDays', 
        headerName: 'No. of leave days remaining', 
        headerClassName:'table-header', 
        minWidth: 200, 
        flex: 2, 
        rowSpanValueGetter: rowSpanValueFunc},

    { field: 'button', 
        headerName: '', 
        minWidth: 200, 
        flex: 2, 
        disableColumnMenu: true, 
        sortable: false, 
        filterable: false, 
        renderCell: RenderButton, 
        rowSpanValueGetter: rowSpanValueFunc,
        teacherBtnProps: [
            {name: 'View Schedule', href: null}
        ],
    }      
];

//Main table component
const TeacherTable = ()=>{

    //handler(s) for table buttons with useNavigate hook, 
    //defined here to be passed down to DataGrid via props 
    const navigate = useNavigate();
    const handleTeacherScheduleClick = (rowData) => {
        navigate(`/schedules/${rowData.id}`);
    };

    //State used for "saving" section data
    const [teachers, setTeachers] = useState([]);

    // useEffect for retrieving all teacher records on page load
    //and sending data to DataGrid in Table component
    //useEffect clones teacher data, and modifies it to suit the columns 
    //in TeacherTable
    useEffect(() => {
        const fetchTeachers = async () => {
          const res = await axios.get(`${BACKEND_URL}/api/teachers`);
          const processedArr = [];
          let idCounter = 0;
          res.data.forEach((teacher) => {
                teacher.courses.forEach((course) => {
                    idCounter = idCounter + 1;
                    const courseDetails = `${course.courseCode}: ${course.name}`;
                    const entry = structuredClone(teacher);
                    delete entry.courses;
                    entry.courses = courseDetails;
                    entry.internalId = idCounter;
                    entry.button = 'teacher';
                    processedArr.push(entry);
                    ;
                })
                
          });

          setTeachers(processedArr);
        };
        fetchTeachers();
      }, []);

    return (
        <div className='table'>
            <Table 
                rows = {teachers}
                columns = {columns}
                getRowId ={(row) => row.internalId}
                rowSpacingVals = {[0,30]}
                slots={{ 
                    columnMenu: SetColumnMenu,
                    noRowsOverlay: ()=><Box p={5}>No teachers to display</Box>, 
                }}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 50, page: 0 },
                    },
                      }}
                rowSpanning = {true}
                handleTeacherScheduleClick = {handleTeacherScheduleClick}
            />
        </div>
    )
}
export default TeacherTable;
