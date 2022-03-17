import React, { useEffect, useState, useCallback } from 'react'
import { fetchData } from '../../api/fetchData'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled } from '@mui/material'

const StyledH4 = styled('h3')({
  margin: 0,
})
const StyledParagraph = styled('p')({
  margin: 0,
})

const createMarkup = (p: string) => {
  return { __html: p }
}

const renderAccordion = (items: string[]) => {
  const title = items[0]
  const paragraphs = items.slice(1)
  return (
    <Accordion key={title}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`header${title.replace(' ', '')}`}
        id={`header${title.replace(' ', '')}}`}
      >
        <StyledH4>{title}</StyledH4>
      </AccordionSummary>
      <AccordionDetails>
        {paragraphs.map((item, index) => (
          <StyledParagraph key={item + index}>
            <div dangerouslySetInnerHTML={createMarkup(item)} />
          </StyledParagraph>
        ))}
      </AccordionDetails>
    </Accordion>
  )
}

type Props = {
  sheetName: string
}

const Content = ({ sheetName }: Props) => {
  const [isLoading, setLoading] = useState(true)
  const [dataFromResponse, setData] = useState<any>()

  const getAsyncData = useCallback(async () => {
    const { values } = await fetchData({ path: 'getdata', sheet: sheetName })
    if (values) {
      setData(values)
      setLoading(false)
    }
  }, [sheetName])

  useEffect(() => {
    setLoading(true)
    getAsyncData()
  }, [getAsyncData, sheetName])

  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        dataFromResponse?.map((items: any) => renderAccordion(items))
      )}
    </>
  )
}

export default Content
