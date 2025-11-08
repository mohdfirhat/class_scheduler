import * as React from 'react';
import { Grid, Button } from "@mui/material";
import Popover from '@mui/material/Popover';
import './VenuePopup.css'

const VenuePopup= ({formData, venues, venueState, formState})=> {
  console.log(formState);
  const [anchorEl, setAnchorEl] = React.useState(null);
  let selectedVenue = {
      name:"",
      occupancy:"",
      description:""
    }
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
     if (venues.find(venue => venue.id == formState.formData.venueId)){
    selectedVenue = venues.find(venue => venue.id == formState.formData.venueId);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  
  // let selectedVenue;
  // if (venues.find(venue => venue.id == formData.venueId)){
  //   selectedVenue = venues.find(venue => venue.id == formData.venueId);
  // } else{
  //   selectedVenue = {
  //     name:"",
  //     occupancy:"",
  //     description:""
  //   }
  // }
  
  return (
    <Grid className='test'container>
      <Grid size = {4.8}></Grid>
      <Grid size = {4}>
          <Button disabled = {!venueState} aria-describedby={id} sx={{color: '#00838f',}} variant="text" onClick={handleClick}>
          <u>Venue Information</u>
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          sx={{
            '& .MuiPaper-root': {
              width: '40%',
              alignItems: 'center',
            } 
          }}
        >
          <div className='venueWindow'>
              <p className='venueDetails'>
                <span>
                  Name: {selectedVenue.name}<br/>
                  Occupancy: {selectedVenue.occupancy}<br/>
                  Description: {selectedVenue.description}
                </span>
                
              </p>
        
              <img className= 'venueImg' src= {selectedVenue.src}/>
          </div>
        </Popover>
      </Grid>
      
    </Grid>
    
  );
}
export default VenuePopup;