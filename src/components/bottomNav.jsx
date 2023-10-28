import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GradingIcon from '@mui/icons-material/Grading';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router';
import { withStyles } from '@mui/material';

function SimBottomNavigation() {
    const navigate=useNavigate()
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: '100%',backgroundColor:'#e3e5e8',bottom:0, position:'fixed', display:{sm:'none',xs:'block'}}}>
      <BottomNavigation
        showLabels
        sx={{backgroundColor:'#e3e5e8',paddingY:1}}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          if(newValue===0){
            navigate('/main')
          }else if(newValue===1){
            navigate('/orders')
          }else if(newValue===2){
            navigate('/profile')
          }
        }}
      >
        <BottomNavigationAction label="Dashboard" icon={<DashboardIcon />} sx={{"&.Mui-selected":{color: '#965bf6'}}}/>
        {/* sx={{"&.Mui-selected":{color: 'red'}}} */}
        <BottomNavigationAction label="Orders" icon={<GradingIcon />} sx={{"&.Mui-selected":{color: '#965bf6'}}}/>
        <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} sx={{"&.Mui-selected":{color: '#965bf6'}}}/>
      </BottomNavigation>
    </Box>
  );
}

export default (SimBottomNavigation);