import React, { ReactElement } from 'react'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import getPokemons from 'src/api/pokemons/getPokemons'
import Layout from 'src/components/Layout/Layout'
import Main from 'src/components/Main'

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['get-pokemons', 20, 0], () =>
    getPokemons({
      limit: 20,
      offset: 0,
    })
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const Home = (): ReactElement => {
  return (
    <Layout>
      <Main />
    </Layout>
  )
}
export default Home
