import { ThemeProvider } from 'next-themes'
import { getMainLayout } from '@/layouts'
import type { AppProps } from '@/types/next'
import '@/styles/global.scss'
import { GlobalContext } from '@/Context/GlobalContext'

function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || getMainLayout

  return (
    <GlobalContext>
      <ThemeProvider attribute="class" storageKey="theme" value={{ dark: 'dark' }} enableSystem>
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </GlobalContext>
  )
}

export default App
