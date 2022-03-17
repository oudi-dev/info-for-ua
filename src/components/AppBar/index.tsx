import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material'

const StyledMenu = styled(Menu)({
  top: '-42px',
})

const StyledLink = styled(Link)({
  color: '#1974ce',
  textDecoration: 'none',
})

type Options = {
  options: string[]
}

const BottomAppBar = ({ options }: Options) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const ITEM_HEIGHT = 48

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <StyledMenu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '100%',
              },
            }}
          >
            {options.map((option: any) => (
              <MenuItem
                key={option}
                selected={option === 'Pyxis'}
                onClick={handleClose}
              >
                <StyledLink to={option.toLowerCase().replace(/ /g, '-')}>
                  {option.toUpperCase()}
                </StyledLink>
              </MenuItem>
            ))}
          </StyledMenu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Інфо для Українців
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default BottomAppBar
