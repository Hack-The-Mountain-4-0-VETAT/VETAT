import { Typography, Paper, Grid, Avatar, Divider, Card, CardContent, List, ListItem, ListItemText, Box, Container } from '@mui/material'
import { styled } from '@mui/styles';
import React from 'react'

const imageURL = "bg.png";
const Background = styled(Box)({
  position: "absolute",
  width: "100%",
  height: "100%",
  background: "linear-gradient(135deg, #1a1a1a 0%, #2d3436 100%)",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  overflow: 'scroll',
});

const StyledCard = styled(Card)({
  height: '100%',
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  transition: 'transform 0.2s ease-in-out',
  backgroundColor: '#2d3436',
  color: '#ffffff',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
});

const TransactionItem = styled(ListItem)({
  backgroundColor: '#1a1a1a',
  borderRadius: '8px',
  marginBottom: '8px',
  '&:hover': {
    backgroundColor: '#2d3436',
  },
});

export default function Profile() {
  return (
    <Box bgcolor={'#1a1a1a'} minHeight={'100vh'}>
      <Background>
        <Container maxWidth="lg" sx={{ paddingTop: "80px" }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            py: { xs: 4, sm: 6 },
            gap: 3
          }}>
            <Avatar
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU"
              sx={{ 
                width: { xs: 120, sm: 150 }, 
                height: { xs: 120, sm: 150 },
                border: '4px solid #2d3436',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
              }}
            />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <StyledCard>
                  <CardContent>
                    <Typography 
                      variant="h4" 
                      gutterBottom 
                      sx={{ 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        color: '#00b894'
                      }}
                    >
                      Hi, Adam
                    </Typography>
                    <Divider sx={{ my: 2, bgcolor: '#4a4a4a' }} />
                    <List>
                      <ListItem>
                        <ListItemText 
                          primary="Mobile No" 
                          secondary="7628376478"
                          primaryTypographyProps={{ 
                            fontWeight: 'bold',
                            color: '#ffffff'
                          }}
                          secondaryTypographyProps={{ color: '#b2bec3' }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Address" 
                          secondary={
                            <>
                              Gole ka mandir,
                              <br />
                              East electric office
                            </>
                          }
                          primaryTypographyProps={{ 
                            fontWeight: 'bold',
                            color: '#ffffff'
                          }}
                          secondaryTypographyProps={{ color: '#b2bec3' }}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </StyledCard>
              </Grid>

              <Grid item xs={12} md={6}>
                <StyledCard>
                  <CardContent>
                    <Typography 
                      variant="h5" 
                      gutterBottom 
                      sx={{ 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        color: '#00b894'
                      }}
                    >
                      Latest Transactions
                    </Typography>
                    <Divider sx={{ my: 2, bgcolor: '#4a4a4a' }} />
                    <List>
                      <TransactionItem>
                        <ListItemText 
                          primary="12-12-2012"
                          primaryTypographyProps={{ color: '#ffffff' }}
                          secondary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                              <Typography variant="body2" sx={{ color: '#b2bec3' }}>Quantity: 20</Typography>
                              <Typography variant="body2" sx={{ color: '#b2bec3' }}>Price: ₹8.2</Typography>
                            </Box>
                          }
                        />
                      </TransactionItem>
                      <TransactionItem>
                        <ListItemText 
                          primary="14-12-2012"
                          primaryTypographyProps={{ color: '#ffffff' }}
                          secondary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                              <Typography variant="body2" sx={{ color: '#b2bec3' }}>Quantity: 90</Typography>
                              <Typography variant="body2" sx={{ color: '#b2bec3' }}>Price: ₹6.4</Typography>
                            </Box>
                          }
                        />
                      </TransactionItem>
                      <TransactionItem>
                        <ListItemText 
                          primary="30-12-2012"
                          primaryTypographyProps={{ color: '#ffffff' }}
                          secondary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                              <Typography variant="body2" sx={{ color: '#b2bec3' }}>Quantity: 50</Typography>
                              <Typography variant="body2" sx={{ color: '#b2bec3' }}>Price: ₹7.9</Typography>
                            </Box>
                          }
                        />
                      </TransactionItem>
                      <TransactionItem>
                        <ListItemText 
                          primary="7-1-2013"
                          primaryTypographyProps={{ color: '#ffffff' }}
                          secondary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                              <Typography variant="body2" sx={{ color: '#b2bec3' }}>Quantity: 60</Typography>
                              <Typography variant="body2" sx={{ color: '#b2bec3' }}>Price: ₹8.1</Typography>
                            </Box>
                          }
                        />
                      </TransactionItem>
                    </List>
                  </CardContent>
                </StyledCard>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Background>
    </Box>
  )
}