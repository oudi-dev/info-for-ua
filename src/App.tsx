import React, { useState, useEffect } from 'react'
import AppBar from './components/AppBar'
import { fetchData } from './api/fetchData'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import Content from './components/Content'
import { styled } from '@mui/material'

const StyleWrapper = styled('div')({
  padding: '0.6rem',
})

function App() {
  const [options, setOptions] = useState([])
  const getAsyncData = async () => {
    const { sheets } = await fetchData({ path: 'sheets' })
    const mappedOptions = sheets?.map((item: any) => item.properties.title)
    setOptions(mappedOptions)
  }

  useEffect(() => {
    getAsyncData()
  }, [])
  return (
    <StyleWrapper>
      <Router>
        {options?.length > 0 && <AppBar options={options} />}
        <Routes>
          {options &&
            options.map((option: string) => (
              <Route
                key={option}
                path={option.toLowerCase().replace(/ /g, '-')}
                element={<Content sheetName={option.toUpperCase()} />}
              />
            ))}
          <Route path="/" element={<Navigate replace to="/info" />} />
        </Routes>
      </Router>
    </StyleWrapper>
  )
}

export default App
