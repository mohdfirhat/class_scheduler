import { SetColumnMenu } from '../../utils/TableFuncs';
import Table from './Table';

//dummy data
const rows = [
    { id: 'AL101', name: 'Algebra I: Intro to Algebra', department: 'Mathematics', description: 'Introduction class to basic algebra' },
    { id: 'AL102', name: 'Algebra II: Advanced Algebra', department: 'Mathematics', description: 'An in-depth look at complex algebraic equations' },
    { id: 'DF103', name: 'Differentiation III: Differential Equations', department: 'Mathematics', description: 'Introduction to ordinary and partial differential equations' },
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
