import { SetColumnMenu } from '../../utils/TableFuncs';
import Table from './Table';

//dummy data
const rows = [
    { id: 'CS101', name: 'Programming Fundamentals', department: 'Computer Science', description: 'Introduction class to Programming Fundamentals' },
    { id: 'CS102', name: 'Object-Oriented Programming', department: 'Computer Science', description: 'Basics of Object Oriented Programming' },
    { id: 'CS103', name: 'Data Structures and Algorithms', department: 'Computer Science', description: 'Basics of Data Structures and Algorithms' },
];

const columns = [
    { field: 'id', headerName: 'Course code', headerClassName:'table-header', minWidth: 100, flex: 1, fontWeight: 'bold' },
    { field: 'department', headerName: 'Department', headerClassName:'table-header',minWidth: 100, flex: 1 },
    { field: 'name', headerName: 'Name', headerClassName:'table-header', minWidth: 200, flex: 2, fontWeight: 'bold' },
    { field: 'description', headerName: 'Description', headerClassName:'table-header',minWidth: 300, flex: 3 },
    
];

//Main table component
const CourseTable = (props)=>{
    
    return (
        <div className='table'>
            <h1 className="page-title">Course Overview</h1>
            <Table 
                rows = {rows}
                columns = {columns}
                rowSpacingVals = {[0,30]}
                slots={{ columnMenu: SetColumnMenu }}
            />
        </div>
    )
}
export default CourseTable;
