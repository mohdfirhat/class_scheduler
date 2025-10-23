import { DataGrid, GridColumnMenu } from '@mui/x-data-grid';
import { CheckCircle, Cancel, Pending } from '@mui/icons-material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import './Table.css'

//function used to display status icons
function RenderStatus(props) {
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
function RenderButton(props){
    if (props.value == 'confirmed'){
        return (
            <ButtonGroup variant="outlined" orientation="vertical" aria-label="Basic button group">
                <Button href = {null}>Edit Lesson</Button>
                <Button href = {null}>Cancel Lesson</Button>
            </ButtonGroup>
        )
    } else if (props.value =='cancelled'){
        return (
            <div></div>
        )
    } else if (props.value =='pending'){
        return (
            <ButtonGroup variant="outlined" orientation="vertical" aria-label="Basic button group">
                <Button href = {null}>Edit Lesson</Button>
                <Button href = {null}>Cancel Lesson</Button>
            </ButtonGroup>
        )
    }
    
}

//function used to adjust row margins
const getRowSpacing = ()=> {
    return {
        bottom: 30,
    };
}
//function used to set column menu props
function SetColumnMenu(props) {
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


//Main table component
const Table = ()=>{
   
    const rows = [
        { id: 1, name: 'Algebra I: Intro to Algebra', date: '30 Sep 2025', time:'0800-1000', venue: 'Classroom 2A', class: 'Class 5A', teacher:'Bob', status: 'confirmed', button: 'confirmed' },
        { id: 2, name: 'Algebra II: Advanced Algebra', date: '30 Sep 2025', time:'0800-1000', venue: 'Classroom 2B', class: 'Class 5C', teacher:'Jim', status: 'cancelled', button: 'cancelled' },
        { id: 3, name: 'Differentiation III: Differential Equations', date: '30 Sep 2025', time:'1200-1400', venue: 'Classroom 2B', class: 'Class 5A', teacher:'Bob', status: 'pending', button: 'pending' }
    ];
    const columns = [
        { field: 'name', headerName: 'Name', minWidth: 300, flex: 3 },
        { field: 'date', headerName: 'Date', minWidth: 100, flex: 1 },
        { field: 'time', headerName: 'Time', minWidth: 100, flex: 1},
        { field: 'venue', headerName: 'Venue', minWidth: 150, flex: 1.5 },
        { field: 'class', headerName: 'Class', minWidth: 100, flex: 1 },
        { field: 'teacher', headerName: 'Teacher', minWidth: 100, flex: 1 },
        { field: 'status', headerName: 'Status', minWidth: 100, flex: 1, renderCell: RenderStatus, align: 'center'},
        { field: 'button', headerName: '', minWidth: 200, flex: 2, renderCell: RenderButton, sortable: false, filterable: false }      
    ];

    return (
        <div className='table'>
            <DataGrid 
                rows={rows} 
                columns={columns}
                getRowHeight={() => 'auto'}
                getRowSpacing={getRowSpacing}
                slots={{ columnMenu: SetColumnMenu }}
                showToolbar />
            
        </div>
    )

}
export default Table;

//See valueFormatter() for converting date/time without changing values
//https://mui.com/x/react-data-grid/column-definition/#value-formatter