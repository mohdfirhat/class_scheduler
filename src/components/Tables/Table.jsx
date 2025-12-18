import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";

//function for hiding certain columns in column menu in toolbar
const hiddenFields = ["avatar", "button"];
const getTogglableColumns = (columns) => {
  return columns.filter((column) => !hiddenFields.includes(column.field)).map((column) => column.field);
};

//Main table component
const Table = (props) => {
  //passing handlers passed down in props to the columns props
  //so that the RenderButton function can access them

  if (props.handleEditClick) {
    props.columns.find((col) => col.field == "button").handleEditClick = props.handleEditClick;
  }
  if (props.handleCancelClick) {
    props.columns.find((col) => col.field == "button").handleCancelClick = props.handleCancelClick;
  }
  if (props.handleViewScheduleClick) {
    props.columns.find((col) => col.field == "button").handleViewScheduleClick = props.handleViewScheduleClick;
  }
  if (props.handleApproveClick) {
    props.columns.find((col) => col.field == "button").handleApproveClick = props.handleApproveClick;
  }
  if (props.handleRejectClick) {
    props.columns.find((col) => col.field == "button").handleRejectClick = props.handleRejectClick;
  }
  if (props.handleTeacherScheduleClick) {
    props.columns.find((col) => col.field == "button").handleTeacherScheduleClick = props.handleTeacherScheduleClick;
  }
  if (props.handleViewConflict) {
    props.columns.find((col) => col.field == "button").handleViewConflict = props.handleViewConflict;
  }

  // console.log(props);
  return (
    <Typography component="div">
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        columnVisibilityModel={props.columnVisibilityModel}
        initialState={props.initialState}
        slots={props.slots}
        getRowId={props.getRowId}
        getRowHeight={() => "auto"}
        rowSpanning={props.rowSpanning}
        showToolbar
        slotProps={{ columnsManagement: { getTogglableColumns } }}
        disableRowSelectionOnClick
        sx={{
          //set padding within cells
          "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": { py: "30px" },
          //edit table headers
          "& .table-header": {
            fontWeight: "bold",
            fontSize: 20,
          },
          //remove colored borders when cells are highlighted
          "& .MuiDataGrid-cell:focus ": {
            outline: "0px",
          },
          //set general styles
          fontSize: 18,
          borderColor: "transparent",
          textAlign: "center",
          //padding top/bottom
          pt: "1%",
          //padding left/right
          px: "3%",
        }}
      />
    </Typography>
  );
};
export default Table;
