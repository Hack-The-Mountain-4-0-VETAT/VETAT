import { Typography } from '@mui/material'
import { styled } from '@mui/styles';
import { Box } from '@mui/system'
import React from 'react'
// import SimBottomNavigation from '../components/bottomNav'

const imageURL = "bg.png";
const Background = styled(Box)({
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundImage: `url(${imageURL})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  overflow:'scroll',
});



export default function Profile() {
  return (
    <>
      <Box bgcolor={'rgb(236, 228, 219)'} minHeight={'100vh'}>
        <Background>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',paddingTop:'75px'}}>
          <img width={"auto"} height={"150"} style={{ top: 75, position: 'relative', borderRadius: 10 }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU" alt="" srcSet="" />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection:'column' , justifyContent: 'center', gap:5,zIndex:20 }}>
          <Box height={250} sx={{ borderRadius: 2,backgroundColor: 'white', width: { xs: '100%', sm: '80%' }, display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ marginTop: '75px' }}>
              <Typography variant="p" component="h4" sx={{textAlign:'center'}}>
                  hi, User
              </Typography>
              basic description
            </Box>
          </Box>
          <Box height={50} sx={{ borderRadius: 2, backgroundColor: 'white', width: { xs: '100%', sm: '80%' }, display: 'flex', justifyContent: 'center' }}>
              buttons
          </Box>
          <Box height={250} sx={{ borderRadius: 2, backgroundColor: 'white', width: { xs: '100%', sm: '80%' }, display: 'flex', justifyContent: 'center' }}>
            latest Tansactions
          </Box>
        </Box>
        </Background>
      </Box>
    </>
  )
}
