import { RenderStatus, RenderButton, SetColumnMenu } from '../../utils/TableFuncs';
import Table from './Table'
import {Fragment} from 'react';
//dummy data
const rows = [
    { id: 1, name: 'Bob', start_date: '30 Sep 2025', end_date:'1 Oct 2025', duration: '1', affected_section: 'Algebra I: Intro to Algebra', status:'pending', button: 'conflict' },
    { id: 2, name: 'Jim', start_date: '1 Oct 2025', end_date:'2 Oct 2025', duration: '1', affected_section: 'NA', status:'pending', button: 'pending' },
    { id: 3, name: 'Jim', start_date: '3 Oct 2025', end_date:'7 Oct 2025', duration: '3', affected_section: 'NA', status:'confirmed', button: 'confirmed' },
    { id: 4, name: 'Jim', start_date: '5 Oct 2025', end_date:'8 Oct 2025', duration: '3', affected_section: 'NA', status:'cancelled', button: 'cancelled' }    
]
const columns = [
    { field: 'name', headerName: 'Name', headerClassName:'table-header', minWidth: 100, flex: 3 },
    { field: 'start_date', headerName: 'Start Date', headerClassName:'table-header', minWidth: 100, flex: 1 },
    { field: 'end_date', headerName: 'End Date', headerClassName:'table-header', minWidth: 100, flex: 1 },
    { field: 'duration', headerName: 'Duration (days)', headerClassName:'table-header', minWidth: 100, flex: 1},
    { field: 'status', headerName: 'Status', headerClassName:'table-header', minWidth: 100, align: 'center', flex: 1, renderCell: RenderStatus},
    { field: 'affected_section', headerName: 'Affected Section', headerClassName:'table-header', minWidth: 300, flex: 3 },
    { field: 'button', headerName: '', minWidth: 200, flex: 2, disableColumnMenu: true, sortable: false, filterable: false, renderCell: RenderButton, 
        confirmedBtnProps: [
            {name: 'View Schedule', href: null},
        ],
        cancelledBtnProps: [
            {name: 'View Schedule', href: null}
        ],
        pendingBtnProps: [
            {name: 'Approve', href: null},
            {name: 'Reject', href: null}
        ],
        conflictBtnProps: [
            {name: 'View Conflict', href: null},
            {name: 'Approve', href: null},
            {name: 'Reject', href: null}
        ]
     }        
];

//Main table component
const LeaveTable = ()=>{
    return (
        <Fragment>
            <Table
                rows = {rows}
                columns = {columns}
                rowSpacingVals = {[0,30]}
                slots={{ columnMenu: SetColumnMenu }}
            />
        </Fragment>
    )

}
export default LeaveTable;