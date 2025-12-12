import axios from "axios";
import { RenderButton, SetColumnMenu, RenderAvatar, rowSpanValueFunc } from '../../utils/TableFuncs';
import Table from './Table'
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../api/api";


//See valueFormatter() for converting date/time without changing values
//https://mui.com/x/react-data-grid/column-definition/#value-formatter

//dummy data
// const rows = [
//     { id: 1, firstName: 'Bob', lastName: 'Marley', dept: 'Science', subject:'Biology', email: 'bob@gmail.com', leave: '17', button: 'teacher', avatar:'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg' },
//     { id: 2, firstName: 'Bob', lastName: 'Marley', dept: 'Science', subject:'Chemistry', email: 'bob@gmail.com', leave: '17', button: 'teacher', avatar:'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg' },
//     { id: 3, firstName: 'Jim', lastName: 'Carrey', dept: 'Mathematics', subject:'Elementary Mathematics', email: 'jim@gmail.com', leave: '24', button: 'teacher' },
//     { id: 4, firstName: 'Jim', lastName: 'Carrey', dept: 'Mathematics', subject:'Additional Mathematics', email: 'jim@gmail.com', leave: '24', button: 'teacher' },
//     { id: 5, firstName: 'Daisy', dept: 'English', subject:'Additional Mathematics', email: 'daisy@gmail.com', leave: '24', button: 'teacher' },
// ];

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
        ]
    }      
];

//Main table component
const TeacherTable = ()=>{
    // useEffect for retrieving all teacher records from back end
    // manager ID set to 1 for now as user login is not implemented
    //   const { managerId } = useParams();
      const managerId = 1;
      const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
          const res = await axios.get(`${BACKEND_URL}/api/teachers/${managerId}/courses`);
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
                slots={{ columnMenu: SetColumnMenu}}
                rowSpanning = {true}
            />
        </div>
    )
}
export default TeacherTable;
