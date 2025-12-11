import axios from "axios";
import dayjs from "dayjs";
import { RenderAvatar, RenderStatus, RenderButton, SetColumnMenu, rowSpanValueFunc } from '../../utils/TableFuncs';
import Table from './Table'
import {Fragment} from 'react';
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../api/api";

//dummy data
// const rows = [
//     { id: 1, name: 'Bob', startDate: '30 Sep 2025', endDate:'1 Oct 2025', duration: '1', affectedSection: 'Algebra I: Intro to Algebra', status:'pending', button: 'conflict' },
//     { id: 2, name: 'Jim', startDate: '1 Oct 2025', endDate:'2 Oct 2025', duration: '1', affectedSection: 'NA', status:'pending', button: 'pending' },
//     { id: 3, name: 'Jim', startDate: '3 Oct 2025', endDate:'7 Oct 2025', duration: '3', affectedSection: 'NA', status:'approved', button: 'approved' },
//     { id: 4, name: 'Jim', startDate: '5 Oct 2025', endDate:'8 Oct 2025', duration: '3', affectedSection: 'NA', status:'rejected', button: 'rejected' }    
// ]
const columns = [
    { field: 'avatar', 
        headerName: 'Avatar', 
        headerClassName:'table-header', 
        minWidth: 100, 
        flex: 1, 
        disableColumnMenu: true, 
        sortable: false, 
        renderCell: RenderAvatar, 
        rowSpanValueGetter: rowSpanValueFunc
    },
    { field: 'name', 
        headerName: 'Name', 
        headerClassName:'table-header', 
        minWidth: 100, 
        flex: 3 
    },
    { field: 'startDate', 
        headerName: 'Start Date', 
        headerClassName:'table-header', 
        minWidth: 100, 
        flex: 1 
    },
    { field: 'endDate', 
        headerName: 'End Date', 
        headerClassName:'table-header', 
        minWidth: 100, 
        flex: 1 
    },
    { field: 'duration', 
        headerName: 'Duration (days)', 
        headerClassName:'table-header', 
        minWidth: 100, 
        flex: 1,
        valueGetter: (value, row) => {
            return `${dayjs(row.endDate).diff(dayjs(row.startDate), 'day')}`;
        },
    },
    { field: 'status', 
        headerName: 'Status', 
        headerClassName:'table-header', 
        minWidth: 100, 
        align: 'center', 
        flex: 1, 
        renderCell: RenderStatus
    },
    { field: 'affectedSection', 
        headerName: 'Affected Section', 
        headerClassName:'table-header', 
        minWidth: 300, 
        flex: 3 
    },
    { field: 'button', 
        headerName: '', 
        minWidth: 200, 
        flex: 2, 
        disableColumnMenu: true, 
        sortable: false, 
        filterable: false, 
        renderCell: RenderButton, 
        approvedBtnProps: [
            {name: 'View Schedule', href: null},
        ],
        rejectedBtnProps: [
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
      const [pendingLeaves, setPendingLeaves] = useState([]);
    
      useEffect(() => {
              const fetchPendingLeaves = async () => {           
                const conflictingLeaves = await axios.get(`${BACKEND_URL}/api/leaves/pending/conflicting`);
                const nonConflictingLeaves = await axios.get(`${BACKEND_URL}/api/leaves/pending/non_conflicting`);
                const processedArr = [];
                console.log(conflictingLeaves.data);
                conflictingLeaves.data.forEach((conflictingLeave) => {
                    const entry = new Object();
                    entry.avatar = conflictingLeave.teacher.avatar;
                    entry.id = conflictingLeave.id;
                    entry.name = conflictingLeave.teacher.firstName + ' ' + conflictingLeave.teacher.lastName;
                    entry.startDate = conflictingLeave.startDate;
                    entry.endDate = conflictingLeave.endDate;
                    entry.status = 'conflict';
                    entry.affectedSection = null;
                    entry.button = 'conflict';

                    processedArr.push(entry);
                });
                
                nonConflictingLeaves.data.forEach((nonConflictingLeave) => {
                    const entry = new Object();
                    entry.avatar = nonConflictingLeave.teacher.avatar;
                    entry.id = nonConflictingLeave.id;
                    entry.name = nonConflictingLeave.teacher.firstName + ' ' + nonConflictingLeave.teacher.lastName;
                    entry.startDate = nonConflictingLeave.startDate;
                    entry.endDate = nonConflictingLeave.endDate;
                    entry.status = nonConflictingLeave.status.type;
                    entry.affectedSection = 'NA';
                    entry.button = 'pending';

                    processedArr.push(entry);
                });

                console.log(processedArr);
                setPendingLeaves(processedArr);
            

              };
              fetchPendingLeaves();
            }, []);

    return (
        <Fragment>
            <Table
                rows = {pendingLeaves}
                columns = {columns}
                rowSpacingVals = {[0,30]}
                slots={{ columnMenu: SetColumnMenu }}
            />
        </Fragment>
    )

}
export default LeaveTable;