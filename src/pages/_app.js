import GlobalStyles from '@styles/globals'
import Router from 'next/router'
import { useState, createContext } from 'react'
import * as gtag from '@lib/gtag'
import { ThemeProvider } from 'styled-components'
import { DefaultLayout } from '@layouts/default'
import { darkTheme, lightTheme } from '@themes/theme'

// Notice how we track pageview when route is changed
Router.events.on('routeChangeComplete', (url) => gtag.pageview(url))

export const SwitchThemeContext = createContext(null)
SwitchThemeContext.displayName = 'SwitchThemeContext'

export default function App({ Component, pageProps }) {
  const [isDark, setDark] = useState(true)
  const theme = isDark ? darkTheme : lightTheme

  const switchTheme = () => setDark((prev) => !prev)

  const Layout = Component.Layout || DefaultLayout
  return (
    <ThemeProvider theme={theme}>
      <SwitchThemeContext.Provider value={{ isDark, switchTheme }}>
        <Layout>
          <GlobalStyles />
          <Component {...pageProps} />
        </Layout>
      </SwitchThemeContext.Provider>
    </ThemeProvider>
  )
}
