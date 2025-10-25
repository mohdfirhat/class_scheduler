import { DataGrid } from '@mui/x-data-grid';

const Table = (props)=>{

    //function used to adjust row margins
    const getRowSpacing = ()=> {
        return {
        top: props.rowSpacingVals[0],
        bottom: props.rowSpacingVals[1]
        };
    }

    return (
        <div className='table'>
            <DataGrid 
                rows={props.rows} 
                columns={props.columns}
                // getRowSpacing={getRowSpacing}
                slots={props.slots}
                getRowHeight={() => 'auto'}
                rowSpanning = {props.rowSpanning}
                showToolbar
                sx={{
                    //set padding within cells
                    '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '30px' }
                }}
            />         
        </div>
    )
}
export default Table;