import { navLinks } from '@config'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { LOADER_DELAY } from '@lib/constants'
import * as gtag from '@lib/gtag'
import { SwitchThemeContext } from '@pages/_app'
import { Menu } from '@components/Menu'
import { useScrollDirection } from '@hooks/useScrollDirection'
import { StyledHeader, StyledNav, StyledLinks } from './styles'
import { scrollToSection } from '@utils/scrollToSection'

export const Navbar = ({ isHome }) => {
  const [isMounted, setIsMounted] = useState(!isHome)
  const scrollDirection = useScrollDirection('down')
  const [scrolledToTop, setScrolledToTop] = useState(true)
  const { isDark, switchTheme } = useContext(SwitchThemeContext)

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true)
    }, 100)

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const timeout = isHome ? LOADER_DELAY : 0
  const fadeClass = isHome ? 'fade' : ''
  const fadeDownClass = isHome ? 'fadedown' : ''

  const handleClickResume = () => {
    if (IS_PRODUCTION) {
      gtag.event({
        action: 'click_resume',
        category: 'resume',
        label: 'user clicked on resume button',
      })
    }
    window.open('/resume.pdf', '_blank')
  }

  return (
    <StyledHeader scrollDirection={scrollDirection} scrolledToTop={scrolledToTop}>
      <StyledNav>
        <TransitionGroup component={null}>
          {isMounted ? (
            <CSSTransition classNames={fadeClass} timeout={timeout}>
              <div className="logo" tabIndex="-1">
                {isHome ? (
                  <a
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection('main')
                    }}
                    aria-label="home"
                  >
                    <Image width={42} height={42} src="/logo.svg" alt="personal logo" priority={true} />
                  </a>
                ) : (
                  <Link href="/" passHref>
                    <a aria-label="home">
                      <Image width={42} height={42} src="/logo.svg" alt="personal logo" />
                    </a>
                  </Link>
                )}
              </div>
            </CSSTransition>
          ) : null}
        </TransitionGroup>

        <StyledLinks>
          <ol>
            <TransitionGroup component={null}>
              {isMounted
                ? navLinks?.map(({ url, name }, i) => (
                    <CSSTransition key={name} classNames={fadeDownClass} timeout={timeout}>
                      <li key={url} style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>
                        <a
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection(url)
                          }}
                        >
                          {name}
                        </a>
                      </li>
                    </CSSTransition>
                  ))
                : null}
            </TransitionGroup>
          </ol>

          <TransitionGroup component={null}>
            {isMounted ? (
              <CSSTransition classNames={fadeDownClass} timeout={timeout}>
                <div style={{ transitionDelay: `${isHome ? navLinks.length * 100 : 0}ms` }}>
                  <a onClick={handleClickResume} className="resume-button">
                    Resume
                  </a>
                </div>
              </CSSTransition>
            ) : null}
          </TransitionGroup>

          <TransitionGroup component={null}>
            {isMounted ? (
              <CSSTransition classNames={fadeDownClass} timeout={timeout}>
                <label
                  style={{ transitionDelay: `${isHome ? navLinks.length * 100 : 0}ms` }}
                  className="theme-button"
                  title={isDark ? 'Activate light mode' : 'Activate dark mode'}
                  aria-label={isDark ? 'Activate light mode' : 'Activate dark mode'}
                >
                  <input type="checkbox" checked={isDark} onChange={switchTheme} />
                  <div />
                </label>
              </CSSTransition>
            ) : null}
          </TransitionGroup>
        </StyledLinks>

        <TransitionGroup component={null}>
          {isMounted ? (
            <CSSTransition classNames={fadeClass} timeout={timeout}>
              <Menu />
            </CSSTransition>
          ) : null}
        </TransitionGroup>
      </StyledNav>
    </StyledHeader>
  )
}
