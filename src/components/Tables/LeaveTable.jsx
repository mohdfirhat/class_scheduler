import dayjs from "dayjs";
import axios from "axios";
import {
  RenderAvatar,
  RenderStatus,
  RenderButton,
  SetColumnMenu,
  rowSpanValueFunc,
  fetchPendingLeaves,
  fetchNonPendingLeaves,
  fetchAllLeaves,
} from "../../utils/TableFuncs";
import Table from "./Table";
import { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router";
import { BACKEND_URL } from "../../api/api";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";

const columns = [
  {
    field: "id",
    headerName: "Leave ID",
    headerClassName: "table-header",
    minWidth: 100,
    flex: 1,
    fontWeight: "bold",
  },
  {
    field: "avatar",
    headerName: "",
    headerClassName: "table-header",
    minWidth: 100,
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
    renderCell: RenderAvatar,
    rowSpanValueGetter: rowSpanValueFunc,
  },
  { field: "name", headerName: "Name", headerClassName: "table-header", minWidth: 100, flex: 2 },
  {
    field: "startDate",
    headerName: "Start Date",
    headerClassName: "table-header",
    minWidth: 100,
    flex: 1,
    valueFormatter: (value) => {
      return dayjs(value).format("DD-MMM-YYYY");
    },
  },
  {
    field: "endDate",
    headerName: "End Date",
    headerClassName: "table-header",
    minWidth: 100,
    flex: 1,
    valueFormatter: (value) => {
      return dayjs(value).format("DD-MMM-YYYY");
    },
  },
  {
    field: "duration",
    headerName: "Duration (days)",
    headerClassName: "table-header",
    minWidth: 150,
    flex: 1.5,
    valueGetter: (value, row) => {
      return `${dayjs(row.endDate).diff(dayjs(row.startDate).subtract(1, "day"), "day")}`;
    },
  },
  {
    field: "status",
    headerName: "Status",
    headerClassName: "table-header",
    minWidth: 100,
    align: "center",
    flex: 1,
    renderCell: RenderStatus,
  },
  {
    field: "affectedSection",
    headerName: "Affected Section (s)",
    headerClassName: "table-header",
    minWidth: 300,
    flex: 3,
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
    approvedBtnProps: [{ name: "View Schedule", href: null }],
    rejectedBtnProps: [{ name: "View Schedule", href: null }],
    pendingBtnProps: [
      { name: "Approve", href: null },
      { name: "Reject", href: null },
    ],
    conflictBtnProps: [
      { name: "View Conflict", href: null },
      { name: "Reject", href: null },
    ],
  },
];

//Main table component
const LeaveTable = (props) => {
  const [leaves, setLeaves] = useState([]);
  const [showAffectedSections, setShowAffectedSections] = useState(true);
  const [latestUpdate, setLatestUpdate] = useState([]);

  //handler(s) for table buttons defined here to be passed down to DataGrid via props
  //useNavigate hook used for routing to other urls
  const navigate = useNavigate();
  const handleViewScheduleClick = (rowData) => {
    navigate(`/schedules/${rowData.teacherId}`, { state: { initialDate: rowData.startDate } });
  };

    const handleViewConflict = (rowData) => {
        navigate(`/conflicts/${rowData.id}`);
    };
    const handleApproveClick = async (rowData) => {
        try {
            const res = await axios.put(`${BACKEND_URL}/api/leaves/approve/${rowData.id}`);
            console.log(res);
            toast.success(res.data, {position: 'top-center',});
            setLatestUpdate(res.data);

        } catch (error){
            toast.error(error.response.data,{position: 'top-center',});
        }
    };
    const handleRejectClick = async (rowData) => {
        try {
            const res = await axios.put(`${BACKEND_URL}/api/leaves/reject/${rowData.id}`);
            toast.success(res.data,{position: 'top-center',});
            setLatestUpdate(res.data);

        } catch (error){
            toast.error(error.response.data,{position: 'top-center',});
        }
        
    };
    
    //useEffect to fetch data and generate table depending on the Leave tab selected
    useEffect(() => {
        switch(props.table){
            case "pending":
                fetchPendingLeaves()
                .then((dataArray) => {
                    setLeaves(dataArray);
                })
                .catch((error) => console.error('Error:', error.message));
            break;

      case "nonPending":
        fetchNonPendingLeaves()
          .then((dataArray) => {
            setLeaves(dataArray);
            setShowAffectedSections(false);
          })
          .catch((error) => console.error("Error:", error.message));
        break;

      case "all":
        fetchAllLeaves()
          .then((dataArray) => {
            setLeaves(dataArray);
          })
          .catch((error) => console.error("Error:", error.message));
        break;
    }
  }, [latestUpdate]);

  return (
    <Fragment>
      <h1 className="page-title">{props.title}</h1>

      <Table
        rows={leaves}
        columns={columns}
        columnVisibilityModel={{ affectedSection: showAffectedSections }}
        initialState={{
          sorting: {
            sortModel: [{ field: "startDate", sort: "asc" }],
          },
          pagination: {
            paginationModel: { pageSize: 25, page: 0 },
          },
        }}
        rowSpacingVals={[0, 30]}
        slots={{
          columnMenu: SetColumnMenu,
          noRowsOverlay: () => <Box p={5}>No leaves to display</Box>,
        }}
        handleViewScheduleClick={handleViewScheduleClick}
        handleViewConflict={handleViewConflict}
        handleApproveClick={handleApproveClick}
        handleRejectClick={handleRejectClick}
      />
    </Fragment>
  );
};
export default LeaveTable;
