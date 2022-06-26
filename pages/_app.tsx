import { ThemeProvider } from 'next-themes'
import { getMainLayout } from '@/layouts'
import type { AppProps } from '@/types/next'
import '@/styles/global.scss'
import { GlobalContext } from '@/Context/GlobalContext'
import { SnackbarProvider } from 'notistack'
function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || getMainLayout

  return (
    <SnackbarProvider maxSnack={3}>
      <GlobalContext>
        <ThemeProvider attribute="class" storageKey="theme" value={{ dark: 'dark' }} enableSystem>
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </GlobalContext>
    </SnackbarProvider>
  )
}

export default App
