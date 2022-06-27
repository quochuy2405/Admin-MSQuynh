import { ThemeProvider } from 'next-themes'
import { getMainLayout } from '@/layouts'
import type { AppProps } from '@/types/next'
import '@/styles/global.scss'
import { GlobalContext } from '@/Context/GlobalContext'
import { SnackbarProvider } from 'notistack'
import { LocalizationProvider } from '@mui/lab'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || getMainLayout

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <SnackbarProvider maxSnack={3} autoHideDuration={1300}>
        <GlobalContext>
          <ThemeProvider attribute="class" storageKey="theme" value={{ dark: 'dark' }} enableSystem>
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </GlobalContext>
      </SnackbarProvider>
    </LocalizationProvider>
  )
}

export default App
