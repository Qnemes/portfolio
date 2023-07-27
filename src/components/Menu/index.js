import { navLinks } from '@config'
import { useState, useEffect, useRef, useCallback, useContext } from 'react'
import { KEY_CODES } from '@lib/constants'
import { SwitchThemeContext } from '@pages/_app'
import { useOnClickOutside } from '@hooks/useOnClickOutside'
import { StyledMenu, StyledHamburgerButton, StyledSidebar } from './styles'

export const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => setMenuOpen(!menuOpen)
  const { isDark, switchTheme } = useContext(SwitchThemeContext)

  const buttonRef = useRef(null)
  const navRef = useRef(null)

  let menuFocusables
  let firstFocusableEl
  let lastFocusableEl

  const setFocusables = () => {
    menuFocusables = [buttonRef.current, ...Array.from(navRef.current.querySelectorAll('a'))]
    firstFocusableEl = menuFocusables[0]
    lastFocusableEl = menuFocusables[menuFocusables.length - 1]
  }

  const handleBackwardTab = useCallback(
    (e) => {
      if (document.activeElement === firstFocusableEl) {
        e.preventDefault()
        lastFocusableEl.focus()
      }
    },
    [firstFocusableEl, lastFocusableEl],
  )

  const handleForwardTab = useCallback(
    (e) => {
      if (document.activeElement === lastFocusableEl) {
        e.preventDefault()
        firstFocusableEl.focus()
      }
    },
    [firstFocusableEl, lastFocusableEl],
  )

  const onKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case KEY_CODES.ESCAPE:
        case KEY_CODES.ESCAPE_IE11: {
          setMenuOpen(false)
          break
        }

        case KEY_CODES.TAB: {
          if (menuFocusables && menuFocusables.length === 1) {
            e.preventDefault()
            break
          }
          if (e.shiftKey) {
            handleBackwardTab(e)
          } else {
            handleForwardTab(e)
          }
          break
        }

        default: {
          break
        }
      }
    },
    [handleBackwardTab, handleForwardTab, menuFocusables],
  )

  const onResize = (e) => {
    if (e.currentTarget.innerWidth > 768) {
      setMenuOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)

    setFocusables()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [onKeyDown, setFocusables])

  useEffect(() => {
    document.body.className = menuOpen && 'blur'
  }, [menuOpen])

  const wrapperRef = useRef()
  useOnClickOutside(wrapperRef, () => setMenuOpen(false))

  return (
    <StyledMenu>
      <div ref={wrapperRef}>
        <StyledHamburgerButton onClick={toggleMenu} menuOpen={menuOpen} ref={buttonRef} aria-label="menu">
          <div className="ham-box">
            <div className="ham-box-inner" />
          </div>
        </StyledHamburgerButton>

        <StyledSidebar menuOpen={menuOpen} aria-hidden={!menuOpen} tabIndex={menuOpen ? 1 : -1}>
          <nav ref={navRef}>
            {navLinks ? (
              <ol>
                {navLinks.map(({ url, name }) => (
                  <li key={url}>
                    <a href={url} onClick={() => setMenuOpen(false)}>
                      {name}
                    </a>
                  </li>
                ))}
              </ol>
            ) : null}
            <a href="/resume.pdf" className="resume-link">
              Resume
            </a>
            <label
              className="theme-button"
              title={isDark ? 'Activate light mode' : 'Activate dark mode'}
              aria-label={isDark ? 'Activate light mode' : 'Activate dark mode'}
            >
              <input type="checkbox" checked={isDark} onChange={switchTheme} />
              <div />
            </label>
          </nav>
        </StyledSidebar>
      </div>
    </StyledMenu>
  )
}
