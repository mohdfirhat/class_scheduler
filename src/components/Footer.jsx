import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
const Footer= () => {
    
    return (
    <Box 
        sx={{
            height: '5rem',
            backgroundColor: '#00838f',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'right'
        }}
    >
        <Typography
            sx = {{
                padding: '1%',
                color: 'white'
            }}
        >
            © 2025 All Rights Reserved
        </Typography>
    </Box>
    );
}

export default Footer;