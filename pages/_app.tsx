import Head from "next/head"
import { AppProps } from "next/app"

import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { CacheProvider, EmotionCache } from "@emotion/react"

import theme from "../components/theme"
import createEmotionCache from "../components/createEmotionCache"
import { Providers } from "@/lib/providers"
import WallterContext from "@/context/WallterContext"
import Modals from "@/context/Modals"
import './index.css'
import './etching.css'
// import { Providers } from './providers';
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Deindex Interface</title>
      </Head>

      <Providers>
        <ThemeProvider theme={theme}>
          <Modals>
            <CssBaseline />
            <WallterContext />
            <Component {...pageProps} />
          </Modals>
        </ThemeProvider>
      </Providers>
    </CacheProvider>
  )
}
