import React, { useEffect, useState, useCallback } from 'react'
import { fetchData } from '../../api/fetchData'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled, Typography } from '@mui/material'
import LoadingSpinner from '../LoadingSpinner'

const StyledWrapper = styled('div')({
  padding: '4rem 0 4rem 0',
})

const StyledH3 = styled('h3')({
  margin: 0,
})
const StyledParagraph = styled('p')({
  margin: 0,
})
const StyledAccordionSummary = styled(AccordionSummary)`
  min-height: 40px !important;
  & > div {
    margin: 0 !important;
  }
`

const createMarkup = (p: string) => {
  return { __html: p }
}

const renderSingleAntry = (items: string[]) => {
  const title = items[0]
  const paragraphs = items.slice(1)
  return (
    <>
      <Typography variant="h6">
        <strong>{title}</strong>
      </Typography>
      {paragraphs.map((item, index) => (
        <StyledParagraph key={item + index}>
          <span dangerouslySetInnerHTML={createMarkup(item)} />
        </StyledParagraph>
      ))}
    </>
  )
}
const renderAccordion = (items: string[]) => {
  const title = items[0]
  const paragraphs = items.slice(1)
  return (
    <Accordion key={title}>
      <StyledAccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={title.replace(/ /g, '')}
        id={title.replace(/ /g, '')}
      >
        <StyledH3>{title}</StyledH3>
      </StyledAccordionSummary>
      <AccordionDetails>
        {paragraphs.map((item, index) => (
          <StyledParagraph key={item + index}>
            <span dangerouslySetInnerHTML={createMarkup(item)} />
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
        <LoadingSpinner />
      ) : (
        <StyledWrapper>
          {dataFromResponse && dataFromResponse.length === 1
            ? renderSingleAntry(dataFromResponse[0])
            : dataFromResponse.map((items: any) => renderAccordion(items))}
        </StyledWrapper>
      )}
    </>
  )
}

export default Content
