import { ChangeEvent, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import getPokemons from 'src/api/pokemons/getPokemons'

export default function usePokemonList() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery(
    ['get-pokemons', rowsPerPage, page],
    () =>
      getPokemons({
        limit: rowsPerPage,
        offset: rowsPerPage * page,
      }),
    { keepPreviousData: true, staleTime: 5000 }
  )

  useEffect(() => {
    if (data && data?.results?.length < data?.count) {
      queryClient.prefetchQuery(
        ['get-processing-payments', rowsPerPage, page + 1],
        () =>
          getPokemons({
            limit: rowsPerPage,
            offset: rowsPerPage * (page + 1),
          })
      )
    }
  }, [data, page, queryClient])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return {
    list: data?.results,
    count: data?.count || 0,
    isLoading,
    error,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  }
}
