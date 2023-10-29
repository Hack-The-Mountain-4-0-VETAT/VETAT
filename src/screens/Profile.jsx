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
  overflow: 'scroll',
});



export default function Profile() {
  return (
    <>
      <Box bgcolor={'rgb(236, 228, 219)'} minHeight={'100vh'}>
        <Background>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '75px' }}>
            <img width={"auto"} height={"150"} style={{ top: 75, position: 'relative', borderRadius: 10 }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU" alt="" srcSet="" />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', gap: 5, zIndex: 20 }}>
            <Box height={250} sx={{ borderRadius: 2, backgroundColor: 'white', width: { xs: '100%', sm: '80%' }, display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ marginTop: '75px' }}>
                <Typography variant="p" component="h4" sx={{ textAlign: 'center' }}>
                  Hi, Adam
                </Typography>
                <Box sx={{ marginTop: "5px" }}>
                  <h5>Mobile No: 7628376478</h5>
                  <Box sx={{display:'flex',alignItems:"center",flexDirection:"column",marginTop:"10px"}}>
                    <h5>Address: gole ka mandir,</h5>
                    <h5>East electric office</h5>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box height={50} sx={{ borderRadius: 2, backgroundColor: 'white', width: { xs: '100%', sm: '80%' }, display: 'flex', justifyContent: 'center' }}>
              
            </Box>
            <Box height={250} sx={{ fontWeight:"bolder",fontSize:"20px",borderRadius: 2, backgroundColor: 'white', width: { xs: '100%', sm: '80%' }, display: 'flex',flexDirection:"column", alignItems:'center' }}>
              latest Tansactions
              <Box sx={{display:"flex", width:"80%",gap:"15px",padding:"8px",backgroundColor:"#2b2b2b2b"}}>
                <h5>Date: 12-12-2012</h5>
                <h5>Quantity: 20</h5>
                <h5>Price: 8.2</h5>
              </Box>
              <Box sx={{display:"flex", width:"80%",gap:"15px",padding:"8px",backgroundColor:"#2b2b2b2b"}}>
                <h5>Date: 14-12-2012</h5>
                <h5>Quantity: 90</h5>
                <h5>Price: 6.4</h5>
              </Box>
              <Box sx={{display:"flex", width:"80%",gap:"15px",padding:"8px",backgroundColor:"#2b2b2b2b"}}>
                <h5>Date: 30-12-2012</h5>
                <h5>Quantity: 50</h5>
                <h5>Price: 7.9</h5>
              </Box>
              <Box sx={{display:"flex", width:"80%",gap:"15px",padding:"8px",backgroundColor:"#2b2b2b2b"}}>
                <h5>Date: 7-1-2013</h5>
                <h5>Quantity: 60</h5>
                <h5>Price: 8.1</h5>
              </Box>
            </Box>
          </Box>
        </Background>
      </Box>
    </>
  )
}
