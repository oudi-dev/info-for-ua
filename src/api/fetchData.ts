const getHostName = () => process.env.NODE_ENV === 'development' ? 'http://localhost:3200' : ''

type Options = {
  path: string
  sheet?: string
}
export const fetchData = async ({path, sheet}: Options) => {
  const response: Response = await fetch(
    `${getHostName()}/${path}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        sheet: sheet || 'sheet0',
      },
    }
  )
 return await response.json()
}