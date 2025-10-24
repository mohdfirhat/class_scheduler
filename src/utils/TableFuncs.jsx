import { CheckCircle, Cancel, Pending } from '@mui/icons-material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

//function used to display status icons
export function RenderStatus(props) {
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
export function RenderButton(props){
    if (props.value == 'confirmed'){
        return (
            <ButtonGroup variant="outlined" orientation="vertical" aria-label="Basic button group">
                {props.colDef.confirmedBtnProps.map( btn => (
                    <Button href = {btn.href}>{btn.name}</Button>
                ))}
            </ButtonGroup>
        )
    } else if (props.value =='cancelled'){
        return (
            <ButtonGroup variant="outlined" orientation="vertical" aria-label="Basic button group">
                {props.colDef.cancelledBtnProps.map( btn => (
                    <Button href = {btn.href}>{btn.name}</Button>
                ))}
            </ButtonGroup>
        )
    } else if (props.value =='pending'){
        return (
            <ButtonGroup variant="outlined" orientation="vertical" aria-label="Basic button group">
                {props.colDef.pendingBtnProps.map( btn => (
                    <Button href = {btn.href}>{btn.name}</Button>
                ))}
            </ButtonGroup>
        )
    }
    
}
//function to set table column menu props
export function SetColumnMenu(props) {
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