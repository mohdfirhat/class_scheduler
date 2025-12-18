import axios from "axios";
import { BACKEND_URL } from "../api/api";
import { GridColumnMenu } from "@mui/x-data-grid";
import { CheckCircle, Cancel, Pending, Error } from "@mui/icons-material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Avatar from "@mui/material/Avatar";
import { data } from "react-router";

//function used to display status icons
export const RenderStatus = (props) => {
  if (props.value == "approved") {
    return <CheckCircle sx={{ color: "success.main" }} fontSize="large" />;
  } else if (props.value == "rejected") {
    return <Cancel sx={{ color: '"disabled"' }} fontSize="large" />;
  } else if (props.value == "pending") {
    return <Pending sx={{ color: "warning.main" }} fontSize="large" />;
  } else if (props.value == "conflict") {
    return <Error sx={{ color: "error.main" }} fontSize="large" />;
  }
};

//function used to display buttons depending on status
export const RenderButton = (props) => {
  //mapping handlers passed down by props to functions for
  //switchcase below to access
  const handleEditClick = () => {
    props.colDef.handleEditClick(props.row);
  };
  const handleCancelClick = () => {
    props.colDef.handleCancelClick(props.row);
  };
  const handleViewScheduleClick = () => {
    props.colDef.handleViewScheduleClick(props.row);
  };
  const handleApproveClick = () => {
    props.colDef.handleApproveClick(props.row);
  };
  const handleRejectClick = () => {
    props.colDef.handleRejectClick(props.row);
  };
  const handleTeacherScheduleClick = () => {
    props.colDef.handleTeacherScheduleClick(props.row);
  };

  const handleViewConflict = () => {
    props.colDef.handleViewConflict(props.row);
  };

  //Switch case for mapping handlers to button onClicks depending on status
  let btnProps;
  switch (props.value) {
    case "approved":
      btnProps = props.colDef.approvedBtnProps;
      btnProps.find((btn) => btn.name == "Edit Section")
        ? (btnProps.find((btn) => btn.name == "Edit Section").onclick = handleEditClick)
        : null;
      btnProps.find((btn) => btn.name == "Cancel Section")
        ? (btnProps.find((btn) => btn.name == "Cancel Section").onclick = handleCancelClick)
        : null;
      btnProps.find((btn) => btn.name == "View Schedule")
        ? (btnProps.find((btn) => btn.name == "View Schedule").onclick = handleViewScheduleClick)
        : null;
      break;

    case "rejected":
      btnProps = props.colDef.rejectedBtnProps;
      btnProps.find((btn) => btn.name == "View Schedule")
        ? (btnProps.find((btn) => btn.name == "View Schedule").onclick = handleViewScheduleClick)
        : null;
      break;

    case "pending":
      btnProps = props.colDef.pendingBtnProps;
      btnProps.find((btn) => btn.name == "Edit Section")
        ? (btnProps.find((btn) => btn.name == "Edit Section").onclick = handleEditClick)
        : null;
      btnProps.find((btn) => btn.name == "Cancel Section")
        ? (btnProps.find((btn) => btn.name == "Cancel Section").onclick = handleCancelClick)
        : null;
      btnProps.find((btn) => btn.name == "Approve")
        ? (btnProps.find((btn) => btn.name == "Approve").onclick = handleApproveClick)
        : null;
      btnProps.find((btn) => btn.name == "Reject")
        ? (btnProps.find((btn) => btn.name == "Reject").onclick = handleRejectClick)
        : null;
      break;

    case "conflict":
      btnProps = props.colDef.conflictBtnProps;
      btnProps.find((btn) => btn.name == "View Conflict")
        ? (btnProps.find((btn) => btn.name == "View Conflict").onclick = handleViewConflict)
        : null;
      btnProps.find((btn) => btn.name == "Approve")
        ? (btnProps.find((btn) => btn.name == "Approve").onclick = handleApproveClick)
        : null;
      btnProps.find((btn) => btn.name == "Reject")
        ? (btnProps.find((btn) => btn.name == "Reject").onclick = handleRejectClick)
        : null;
      break;

    case "teacher":
      btnProps = props.colDef.teacherBtnProps;
      btnProps.find((btn) => btn.name == "View Schedule")
        ? (btnProps.find((btn) => btn.name == "View Schedule").onclick = handleTeacherScheduleClick)
        : null;
      break;
  }

  return (
    <ButtonGroup variant="outlined" orientation="vertical" aria-label="Button column group">
      {btnProps.map((btn) => (
        <Button sx={{ color: "#00838f" }} href={btn.href} onClick={btn.onclick}>
          {btn.name}
        </Button>
      ))}
    </ButtonGroup>
  );
};

//function to set table column menu props
export const SetColumnMenu = (props) => {
  return (
    <GridColumnMenu
      {...props}
      slots={{
        // Hide `columnMenuColumnsItem`
        columnMenuColumnsItem: null,
      }}
    />
  );
};

//function for preventing row spanning in cells that don't belong to the same person
// modified from code in customising row-spanning demo https://mui.com/x/react-data-grid/row-spanning/
export const rowSpanValueFunc = (value, row) => {
  return row ? `${row.firstName}${row.lastName}-${value}` : value;
};

/////////////////// Avatar icon functions ////////////////////

//function for rendering avatar icon as component
export const RenderAvatar = (props) => {
  if (props.value != undefined) {
    return <Avatar src={props.value} sx={{ width: 100, height: 100 }} />;
  } else {
    return <Avatar {...stringAvatar(props.row.firstName, props.row.lastName)} />;
  }
};

export const RenderTeacherAvatar = (teacher) => {
  console.log(teacher);
  if (teacher.avatar != null) {
    return <Avatar src={teacher.avatar} sx={{ width: "5rem", height: "5rem" }} />;
  } else {
    return <Avatar {...stringAvatar(teacher.firstName, teacher.lastName)} />;
  }
};

//function for creating default avatar when no img file is provided
export const stringAvatar = (fName, lName) => {
  if (lName == "" || lName == undefined) {
    return {
      sx: {
        bgcolor: stringToColor(fName),
        width: "5rem",
        height: "5rem",
        fontSize: 35,
      },
      children: `${fName[0]}`,
    };
  } else {
    return {
      sx: {
        bgcolor: stringToColor(fName + " " + lName),
        width: "5rem",
        height: "5rem",
        fontSize: 30,
      },
      children: `${fName[0]}${lName[0]}`,
    };
  }
};

// function for randomizing bg colour for avatars with no img files
const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};
////////////////////////////////////

////////////// Leave Table Functions///////////////

// Pending Leaves tab
// function for fetching all leaves with pending status, and sorting them into conflicting and non-conflicting leaves
export const fetchPendingLeaves = async () => {
  const conflictingLeaves = await axios.get(`${BACKEND_URL}/api/leaves/pending/conflicting`);
  const nonConflictingLeaves = await axios.get(`${BACKEND_URL}/api/leaves/pending/non_conflicting`);
  const processedArr = [];

  conflictingLeaves.data.forEach((conflictingLeave) => {
    const entry = new Object();
    entry.avatar = conflictingLeave.teacher.avatar;
    entry.id = conflictingLeave.id;
    entry.teacherId = conflictingLeave.teacher.id;
    entry.firstName = conflictingLeave.teacher.firstName;
    entry.lastName = conflictingLeave.teacher.lastName;
    entry.name = conflictingLeave.teacher.firstName + " " + conflictingLeave.teacher.lastName;
    entry.startDate = conflictingLeave.startDate;
    entry.endDate = conflictingLeave.endDate;
    entry.status = "conflict";
    entry.affectedSection = printAffectedSections(conflictingLeave.conflictingSections);
    entry.button = "conflict";

    processedArr.push(entry);
  });

  nonConflictingLeaves.data.forEach((nonConflictingLeave) => {
    const entry = new Object();
    entry.avatar = nonConflictingLeave.teacher.avatar;
    entry.id = nonConflictingLeave.id;
    entry.teacherId = nonConflictingLeave.teacher.id;
    entry.firstName = nonConflictingLeave.teacher.firstName;
    entry.lastName = nonConflictingLeave.teacher.lastName;
    entry.name = nonConflictingLeave.teacher.firstName + " " + nonConflictingLeave.teacher.lastName;
    entry.startDate = nonConflictingLeave.startDate;
    entry.endDate = nonConflictingLeave.endDate;
    entry.status = nonConflictingLeave.status.type;
    entry.affectedSection = "NA";
    entry.button = "pending";

    processedArr.push(entry);
  });

  return processedArr;
};

// Non Pending Leaves tab
// function for fetching all non leaves with approved and rejected status
export const fetchNonPendingLeaves = async () => {
  const nonPendingLeaves = await axios.get(`${BACKEND_URL}/api/leaves/non_pending`);

  const processedArr = [];
  nonPendingLeaves.data.forEach((leave) => {
    const entry = new Object();
    entry.avatar = leave.teacher.avatar;
    entry.id = leave.id;
    entry.teacherId = leave.teacher.id;
    entry.firstName = leave.teacher.firstName;
    entry.lastName = leave.teacher.lastName;
    entry.name = leave.teacher.firstName + " " + leave.teacher.lastName;
    entry.startDate = leave.startDate;
    entry.endDate = leave.endDate;
    entry.status = leave.status.type;
    entry.affectedSection = "NA";
    entry.button = leave.status.type;

    processedArr.push(entry);
  });

  return processedArr;
};

// All Leaves tab
// function for fetching all leaves, combining both pending and non pending leaves
export const fetchAllLeaves = async () => {
  const pendingLeavesArr = await fetchPendingLeaves();
  const nonPendingLeavesArr = await fetchNonPendingLeaves();

  const combinedArr = [...pendingLeavesArr, ...nonPendingLeavesArr];
  return combinedArr;
};

const printAffectedSections = (sectionArr) => {
  let str = "";
  for (let i = 0; i < sectionArr.length; i++) {
    str += "[" + sectionArr[i].id + "] ";
    str += sectionArr[i].course.courseCode;
    if (i != sectionArr.length - 1) {
      str += ", ";
    }
  }
  return str;
};
