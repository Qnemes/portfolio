import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Email } from '@components/Email'
import { Social } from '@components/Social'
import { BaseLayout } from './base'
import { Footer } from './footer'
import { Main } from './main'
import { Navbar } from './navbar'

export const DefaultLayout = ({ children }) => {
  const router = useRouter()
  const isHome = router.pathname === '/'
  const isBrowser = typeof window !== 'undefined'

  useEffect(() => {
    if (isHome || !isBrowser) {
      return
    }

    if (window.location.hash) {
      const id = window.location.hash.substring(1) // location.hash without the '#'
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView()
          el.focus()
        }
      }, 0)
    }
  }, [isHome, isBrowser])

  return (
    <BaseLayout>
      <>
        <Navbar isHome={isHome} />
        <Social isHome={isHome} />
        <Email isHome={isHome} />
        <Main id="content" className={isHome ? 'fillHeight' : ''}>
          {children}
        </Main>
        <Footer />
      </>
    </BaseLayout>
  )
}
