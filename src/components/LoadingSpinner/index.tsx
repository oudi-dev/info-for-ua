import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material'

const StyledSpanWrapper = styled('span')({
  padding: '4rem 0.5rem 0.5rem 0.5rem',
  display: 'inline-block',
})

const LoadingSpinner = () => {
  return (
    <StyledSpanWrapper>
      <CircularProgress />
    </StyledSpanWrapper>
  )
}

export default LoadingSpinner
