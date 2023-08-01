import GlobalStyles from '@styles/globals'
import { Analytics } from '@vercel/analytics/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useState, useEffect, createContext } from 'react'
import * as gtag from '@lib/gtag'
import { ThemeProvider } from 'styled-components'
import { DefaultLayout } from '@layouts/default'
import { darkTheme, lightTheme } from '@themes/theme'

export const SwitchThemeContext = createContext(null)
SwitchThemeContext.displayName = 'SwitchThemeContext'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  const [isDark, setDark] = useState(true)
  const theme = isDark ? darkTheme : lightTheme

  const switchTheme = () => setDark((prev) => !prev)

  const Layout = Component.Layout || DefaultLayout
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <ThemeProvider theme={theme}>
        <SwitchThemeContext.Provider value={{ isDark, switchTheme }}>
          <Layout>
            <GlobalStyles />
            <Component {...pageProps} />
            <Analytics />
          </Layout>
        </SwitchThemeContext.Provider>
      </ThemeProvider>
    </>
  )
}
