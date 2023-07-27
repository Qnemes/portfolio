import { useState, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { LOADER_DELAY } from '@lib/constants'
import { StyledSideElement } from './styles'

export const Side = ({ children, isHome, orientation }) => {
  const [isMounted, setIsMounted] = useState(!isHome)

  useEffect(() => {
    if (!isHome) {
      return undefined
    }
    const timeout = setTimeout(() => setIsMounted(true), LOADER_DELAY)
    return () => clearTimeout(timeout)
  }, [isHome])

  return (
    <StyledSideElement orientation={orientation}>
      <TransitionGroup component={null}>
        {isMounted ? (
          <CSSTransition classNames={isHome ? 'fade' : ''} timeout={isHome ? LOADER_DELAY : 0}>
            {children}
          </CSSTransition>
        ) : null}
      </TransitionGroup>
    </StyledSideElement>
  )
}
