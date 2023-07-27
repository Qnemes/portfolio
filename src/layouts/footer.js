import { socialMedia } from '@config'
import Image from 'next/image'
import { useContext, useEffect, useRef } from 'react'
import { SwitchThemeContext } from '@pages/_app'
import { StyledFooter, StyledSocialLinks, StyledMadeWith } from './styles'
import { scrollRevealConfig } from '@config/scrollReveal'

export const Footer = () => {
  const { isDark } = useContext(SwitchThemeContext)
  const revealContainer = useRef(null)

  useEffect(() => {
    async function animate() {
      if (revealContainer.current) {
        const scrollReveal = (await import('scrollreveal')).default
        scrollReveal().reveal(revealContainer.current, scrollRevealConfig())
      }
    }
    animate()
  }, [])

  return (
    <StyledFooter ref={revealContainer}>
      <StyledSocialLinks>
        <ul>
          {socialMedia?.map(({ name, url }) => (
            <li key={name}>
              <a href={url} aria-label={name}>
                <svg>
                  <use xlinkHref={`icons.svg#${name.toLowerCase()}`}></use>
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </StyledSocialLinks>

      <StyledMadeWith>
        <p>Made with</p>
        <a rel="noreferrer" target="_blank" href="https://nextjs.org/">
          <Image
            src={`/nextjs-${isDark ? 'white' : 'dark'}-logo.svg`}
            width={100}
            height={100}
            alt="Next.js logo"
          />
        </a>
      </StyledMadeWith>
    </StyledFooter>
  )
}
