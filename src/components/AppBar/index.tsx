import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useLocation } from 'react-router-dom'
import { styled } from '@mui/material'

const StyledMenu = styled(Menu)({
  top: '-42px',
})

const StyledLink = styled(Link)({
  color: '#1974ce',
  textDecoration: 'none',
})

type Option = {
  id: string
  title: string
}

type Options = {
  options: Option[]
}

const BottomAppBar = ({ options }: Options) => {
  const { pathname } = useLocation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [menuItems, setMenuItems] = useState<Option[] | null>(null)
  const [selectedPath, setSelectedPath] = useState('')

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const preparedItems = useCallback(
    (itemsString: string | undefined) => {
      if (itemsString) {
        const items = itemsString.split(',')
        return items.map((item) => {
          const path = item.split(':')[0]
          const title = item.split(':')[1]
          if (pathname.includes(path)) {
            selectedPath === '' && setSelectedPath(title)
          }
          return {
            id: path,
            title: title,
          }
        })
      } else {
        return []
      }
    },
    [pathname, selectedPath]
  )

  useEffect(() => {
    const parsedMenuItems = preparedItems(process.env.REACT_APP_MENU_ITEMS)
    parsedMenuItems.length && setMenuItems(parsedMenuItems)
  }, [preparedItems])

  const getTranslation = (id: string) => {
    const pickTranslationObj = menuItems?.find((item) => item.id === id)
    return pickTranslationObj ? pickTranslationObj?.title : id
  }

  const getSelectedPath = (): string => {
    return (
      menuItems?.find((item) => pathname.includes(item.id))?.title ||
      pathname.replace(/\//, '')
    )
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
            {options.length &&
              options.map((option: Option) => {
                return (
                  <MenuItem key={option.id} onClick={handleClose}>
                    <StyledLink to={option.title}>
                      {getTranslation(option.title)}
                    </StyledLink>
                  </MenuItem>
                )
              })}
          </StyledMenu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {getSelectedPath()}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default BottomAppBar
