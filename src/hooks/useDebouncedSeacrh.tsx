import { useState, useEffect } from 'react'

const useDebouncedSearch = (search: string) => {
  const [debouncedSearch, setDebouncedSearch] = useState<string>("")

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500);
    return () => {
      clearTimeout(handler)
    }
  }, [search])

  return debouncedSearch
}

export default useDebouncedSearch
