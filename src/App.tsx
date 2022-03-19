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
import Header from './components/Header'
import { styled } from '@mui/material'

const StyleWrapper = styled('div')({
  padding: '0.6rem',
})

type Option = {
  id: string
  title: string
}

function App() {
  const [options, setOptions] = useState<Option[]>([])
  const getAsyncData = async () => {
    const { sheets } = await fetchData({ path: 'sheets' })
    const mappedOptions = sheets?.map((item: any) => ({
      id: item.properties.sheetId,
      title: item.properties.title,
    }))
    setOptions(mappedOptions)
  }

  useEffect(() => {
    getAsyncData()
  }, [])

  return (
    <StyleWrapper>
      <Router>
        <Header />
        {options?.length > 0 && <AppBar options={options} />}
        <Routes>
          {options &&
            options.map((option: Option) => (
              <Route
                key={option.title}
                path={option.title}
                element={<Content sheetName={option.title} />}
              />
            ))}
          <Route path="/" element={<Navigate replace to="/info" />} />
        </Routes>
      </Router>
    </StyleWrapper>
  )
}

export default App
