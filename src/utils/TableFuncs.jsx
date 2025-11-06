import { GridColumnMenu } from '@mui/x-data-grid';
import { CheckCircle, Cancel, Pending } from '@mui/icons-material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Avatar from '@mui/material/Avatar';

//function used to display status icons
export const RenderStatus = (props) => {
    if (props.value == 'confirmed'){
        return (
            <CheckCircle
                sx={{ color: 'success.main' }}
                fontSize="large"
            />
        )
    } else if (props.value =='cancelled'){
        return (
            <Cancel
                sx={{ color: 'error.main' }}
                fontSize="large"
            />
        )
    } else if (props.value =='pending'){
        return (
            <Pending
                sx={{ color: 'warning.main' }}
                fontSize="large"
            />
        )
    }   
}

//function used to display buttons depending on status
export const RenderButton = (props) => {
    
    
    const handleEditClick = ()=> {
        props.colDef.handleEditClick(props.row);
    };
    const handleCancelClick = ()=> {
        
    };
    const handleViewScheduleClick = ()=> {

    };
    const handleApproveClick = ()=> {
        
    };
    const handleRejectClick = ()=> {
        
    };
    const handleTeacherScheduleClick = ()=> {
        
    };
    const handleViewConflict = ()=> {
    
    };

    //Switch case for mapping handlers to button onClicks depending on status
    let btnProps;
    switch (props.value) {
        case 'confirmed': 
            btnProps = props.colDef.confirmedBtnProps;
            btnProps.find(btn => btn.name == 'Edit Section') ? btnProps.find(btn => btn.name == 'Edit Section').onclick = handleEditClick : null;
            btnProps.find(btn => btn.name == 'Cancel Section') ? btnProps.find(btn => btn.name == 'Cancel Section').onclick = handleCancelClick : null;
            btnProps.find(btn => btn.name == 'View Schedule') ? btnProps.find(btn => btn.name == 'View Schedule').onclick = handleViewScheduleClick : null; 
            break;
        
        case 'cancelled':
            btnProps = props.colDef.cancelledBtnProps;
            btnProps.find(btn => btn.name == 'View Schedule') ? btnProps.find(btn => btn.name == 'View Schedule').onclick = handleViewScheduleClick : null; 
            break;    

        case 'pending':
            btnProps = props.colDef.pendingBtnProps;
            btnProps.find(btn => btn.name == 'Edit Section') ? btnProps.find(btn => btn.name == 'Edit Section').onclick = handleEditClick : null;
            btnProps.find(btn => btn.name == 'Cancel Section') ? btnProps.find(btn => btn.name == 'Cancel Section').onclick = handleCancelClick : null;
            btnProps.find(btn => btn.name == 'Approve') ? btnProps.find(btn => btn.name == 'Approve').onclick = handleApproveClick : null;
            btnProps.find(btn => btn.name == 'Reject') ? btnProps.find(btn => btn.name == 'Reject').onclick = handleRejectClick : null;
            break;

        case 'conflict':
            btnProps = props.colDef.conflictBtnProps;
            btnProps.find(btn => btn.name == 'View Conflict') ? btnProps.find(btn => btn.name == 'View Conflict').onclick = handleViewConflict : null;
            btnProps.find(btn => btn.name == 'Approve') ? btnProps.find(btn => btn.name == 'Approve').onclick = handleApproveClick : null;
            btnProps.find(btn => btn.name == 'Reject') ? btnProps.find(btn => btn.name == 'Reject').onclick = handleRejectClick : null;
            break;

        case 'teacher':
            btnProps = props.colDef.teacherBtnProps;
            btnProps.find(btn => btn.name == 'View Schedule') ? btnProps.find(btn => btn.name == 'View Schedule').onclick = handleTeacherScheduleClick : null; 
            break;
    }

    return (
        <ButtonGroup variant="outlined" orientation="vertical" aria-label="Button column group">
            {btnProps.map( btn=> (
                <Button href = {btn.href} onClick={btn.onclick}>{btn.name}</Button>
            ))}
        </ButtonGroup>
    )
    
    
}

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
}

//function for preventing row spanning in cells that don't belong to the same person
// modified from code in customising row-spanning demo https://mui.com/x/react-data-grid/row-spanning/
export const rowSpanValueFunc = (value, row) => {
    return row ? `${row.firstName}${row.lastName}-${value}` : value;
}


/////////////////// Avatar icon functions ////////////////////

//function for rendering avatar icon as component
export const RenderAvatar = (props) => {
    if (props.value != undefined){
        return (
            <Avatar 
                src = {props.value}
                sx={{ width: 100, height: 100 }}
            />
        )
    } else {
        return (
            <Avatar
                {...stringAvatar(props.row.firstName, props.row.lastName)}
            />
        )
    }
}

//function for creating default avatar when no img file is provided
export const stringAvatar = (fName, lName) => {
    if (lName == ''||lName == undefined){
       return {
            sx: {
            bgcolor: stringToColor(fName),
            width: 100, height: 100,
            fontSize: 35  
            },
            children: `${fName[0]}`,
        }; 
    } else {
        return {
            sx: {
            bgcolor: stringToColor(fName+' '+lName),
            width: 100, height: 100,
            fontSize: 30   
            },
            children: `${fName[0]}${lName[0]}`,
        };
    }
}

// function for randomizing bg colour for avatars with no img files
const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
////////////////////////////////////

