import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import Head from 'next/head'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Hydrate } from 'react-query/hydration'
import theme from 'src/styles/theme'

function MyApp({ Component, pageProps }) {
  const queryClientRef = React.useRef<any>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnMount: false,
          refetchOnWindowFocus: false,
        },
      },
    })
  }

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps?.dehydratedState}>
        <Head>
          <title>Pokemons</title>
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, user-scalable=0'
          />
          <link rel='icon' href={require('public/favicon.ico')} />
        </Head>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <CssBaseline />
        </ThemeProvider>
      </Hydrate>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}

export default MyApp
