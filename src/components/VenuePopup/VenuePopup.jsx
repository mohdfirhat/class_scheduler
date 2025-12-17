import { useState } from "react";
import { Grid, Button } from "@mui/material";
import Popover from "@mui/material/Popover";
import "./VenuePopup.css";

//Component for rendering venue popup in CreateSectionTab
const VenuePopup = ({ venues, isVenueFilled, formState }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState({
    name: "",
    occupancy: "",
    description: "",
  });

  //handlers for clicking VENUE INFORMATION button. handleClick retrieves venue data based
  //venue selected in dropdown menu, and renders venue data in the popup
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (venues.find((venue) => venue.id == formState.formData.venueId)) {
      setSelectedVenue(venues.find((venue) => venue.id == formState.formData.venueId));
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Grid className="test" container>
      <Grid size={4.8}></Grid>
      <Grid size={4}>
        <Button
          disabled={!isVenueFilled}
          aria-describedby={id}
          sx={{ color: "#00838f" }}
          variant="text"
          onClick={handleClick}
        >
          <u>Venue Information</u>
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{
            "& .MuiPaper-root": {
              width: "40%",
              alignItems: "center",
            },
          }}
        >
          <div className="venueWindow">
            <p className="venueDetails">
              <span>
                Name: {selectedVenue.name}
                <br />
                Occupancy: {selectedVenue.occupancy}
                <br />
                Description: {selectedVenue.description}
              </span>
            </p>

            <img className="venueImg" src={selectedVenue.imgUrl} />
          </div>
        </Popover>
      </Grid>
    </Grid>
  );
};
export default VenuePopup;
