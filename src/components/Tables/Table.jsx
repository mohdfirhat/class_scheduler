import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';


//function for hiding certain columns in column menu in toolbar
const hiddenFields = ['avatar', 'button'];
const getTogglableColumns = (columns) => {
  return columns
    .filter((column) => !hiddenFields.includes(column.field))
    .map((column) => column.field);
};

const Table = (props)=>{
    //function used to adjust row margins
    const getRowSpacing = ()=> {
        return {
        top: props.rowSpacingVals[0],
        bottom: props.rowSpacingVals[1]
        };
    }

    return (

        <Typography component='div'>
            <DataGrid 
                rows={props.rows} 
                columns={props.columns}
                // getRowSpacing={getRowSpacing}
                slots={props.slots}
                getRowHeight={() => 'auto'}
                rowSpanning = {props.rowSpanning}
                showToolbar
                slotProps={{columnsManagement: {getTogglableColumns,},}}
                disableRowSelectionOnClick
                sx={{
                    //set padding within cells
                    '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '30px' },
                    //edit table headers
                    '& .table-header':{
                        fontWeight: 'bold',
                        fontSize: 20
                    },
                    
                    //set general styles
                    fontSize: 18,
                    borderColor: 'transparent',
                    textAlign: 'center',
                    //padding top/bottom
                    pt: '1%',
                    //padding left/right
                    px: '3%'
                }}
            />
        </Typography>         

    )
}
export default Table;