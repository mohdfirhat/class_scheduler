import { RenderStatus, RenderButton, SetColumnMenu } from '../utils/TableFuncs';
import Table from './Table'
import './LessonTable.css'

//See valueFormatter() for converting date/time without changing values
//https://mui.com/x/react-data-grid/column-definition/#value-formatter
//dummy data
const rows = [
    { id: 1, name: 'Algebra I: Intro to Algebra', date: '30 Sep 2025', time:'0800-1000', venue: 'Classroom 2A', class: 'Class 5A', teacher:'Bob', status: 'confirmed', button: 'confirmed' },
    { id: 2, name: 'Algebra II: Advanced Algebra', date: '30 Sep 2025', time:'0800-1000', venue: 'Classroom 2B', class: 'Class 5C', teacher:'Jim', status: 'cancelled', button: 'cancelled' },
    { id: 3, name: 'Differentiation III: Differential Equations', date: '30 Sep 2025', time:'1200-1400', venue: 'Classroom 2B', class: 'Class 5A', teacher:'Bob', status: 'pending', button: 'pending' },
];

const columns = [
    { field: 'name', headerName: 'Name', minWidth: 300, flex: 3 },
    { field: 'date', headerName: 'Date', minWidth: 100, flex: 1 },
    { field: 'time', headerName: 'Time', minWidth: 100, flex: 1},
    { field: 'venue', headerName: 'Venue', minWidth: 150, flex: 1.5 },
    { field: 'class', headerName: 'Class', minWidth: 100, flex: 1 },
    { field: 'teacher', headerName: 'Teacher', minWidth: 100, flex: 1 },
    { field: 'status', headerName: 'Status', minWidth: 100, flex: 1, align: 'center', renderCell: RenderStatus},
    { field: 'button', headerName: '', minWidth: 200, flex: 2, sortable: false, filterable: false, renderCell: RenderButton,
        confirmedBtnProps: [
            {name: 'Edit Lesson', href: null},
            {name: 'Cancel Lesson', href: null}
        ],
        cancelledBtnProps: [
        ],
        pendingBtnProps: [
            {name: 'Edit Lesson', href: null},
            {name: 'Cancel Lesson', href: null}
        ]
    }      
];

//Main table component
const LessonTable = ()=>{
    return (
        <div className='table'>
            <Table 
                rows = {rows}
                columns = {columns}
                rowSpacingVals = {[0,30]}
                slots={{ columnMenu: SetColumnMenu }}
            />
        </div>
    )
}
export default LessonTable;
