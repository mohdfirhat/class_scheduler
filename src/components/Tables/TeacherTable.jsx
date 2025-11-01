import { RenderButton, SetColumnMenu, RenderAvatar, rowSpanValueFunc } from '../../utils/TableFuncs';
import Table from './Table'
import './LessonTable.css'

//See valueFormatter() for converting date/time without changing values
//https://mui.com/x/react-data-grid/column-definition/#value-formatter

//dummy data
const rows = [
    { id: 1, firstName: 'Bob', lastName: 'Marley', dept: 'Science', subject:'Biology', email: 'bob@gmail.com', leave: '17', button: 'teacher', avatar:'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg' },
    { id: 2, firstName: 'Bob', lastName: 'Marley', dept: 'Science', subject:'Chemistry', email: 'bob@gmail.com', leave: '17', button: 'teacher', avatar:'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg' },
    { id: 3, firstName: 'Jim', lastName: 'Carrey', dept: 'Mathematics', subject:'Elementary Mathematics', email: 'jim@gmail.com', leave: '24', button: 'teacher' },
    { id: 4, firstName: 'Jim', lastName: 'Carrey', dept: 'Mathematics', subject:'Additional Mathematics', email: 'jim@gmail.com', leave: '24', button: 'teacher' },
    { id: 5, firstName: 'Daisy', dept: 'English', subject:'Additional Mathematics', email: 'daisy@gmail.com', leave: '24', button: 'teacher' },
];

const columns = [
    { field: 'avatar', headerName: 'Avatar', minWidth: 100, flex: 1, disableColumnMenu: true, sortable: false, renderCell: RenderAvatar, rowSpanValueGetter: rowSpanValueFunc},
    { field: 'firstName', headerName: 'First Name', minWidth: 150, flex: 1.5, rowSpanValueGetter: rowSpanValueFunc },
    { field: 'lastName', headerName: 'Last Name', minWidth: 150, flex: 1.5, rowSpanValueGetter: rowSpanValueFunc },
    { field: 'dept', headerName: 'Department', minWidth: 150, flex: 1.5, rowSpanValueGetter: rowSpanValueFunc},
    { field: 'subject', headerName: 'Subject(s) Taught', minWidth: 100, flex: 1 , rowSpanValueGetter: rowSpanValueFunc},
    { field: 'email', headerName: 'Email', minWidth: 150, flex: 1.5 , rowSpanValueGetter: rowSpanValueFunc},
    { field: 'leave', headerName: 'No. of leave days remaining', minWidth: 200, flex: 2, rowSpanValueGetter: rowSpanValueFunc},
    { field: 'button', headerName: '', minWidth: 200, flex: 2, disableColumnMenu: true, sortable: false, filterable: false, renderCell: RenderButton, rowSpanValueGetter: rowSpanValueFunc,
        teacherBtnProps: [
            {name: 'View Schedule', href: null}
        ]
    }      
];

//Main table component
const TeacherTable = ()=>{
    return (
        <div className='table'>
            <Table 
                rows = {rows}
                columns = {columns}
                rowSpacingVals = {[0,30]}
                slots={{ columnMenu: SetColumnMenu}}
                rowSpanning = {true}
            />
        </div>
    )
}
export default TeacherTable;
