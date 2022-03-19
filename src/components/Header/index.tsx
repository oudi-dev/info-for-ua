import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Logo from '../../imgs/logo-32x32.png'
import { styled } from '@mui/material'

const StyledSpan = styled('span')({
  display: 'inline-block',
  borderRadius: '50%',
  overflow: 'hidden',
  width: '32px',
  height: '32px',
  border: '2px solid lightgrey',
  marginRight: '10px',
})

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="default" position="absolute">
        <Toolbar>
          <StyledSpan>
            <img src={Logo} alt="UA" />
          </StyledSpan>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Інфо для Українців
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
