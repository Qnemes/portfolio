import { NumberedHeading } from '@common/styles'
import { skills } from '@config'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { StyledAboutSection, StyledText, StyledPic } from './styles'
import { scrollRevealConfig } from '@config/scrollReveal'

export const About = () => {
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
    <StyledAboutSection id="about" ref={revealContainer}>
      <NumberedHeading>About Me</NumberedHeading>
      <div className="inner">
        <StyledText>
          <div>
            <p>Hello! I&apos;m Vladyslav, a Frontend Developer based in Opole, Poland.</p>
            <p>
              I enjoy creating beautiful and reliable applications for internet and phones.
              <br />
              My goal is to always build scalable products and performant experiences.
            </p>
            <br />
            <p>Here are a few technologies I&apos;ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills?.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <Image width={300} height={300} src="/avatar.jpg" alt="Avatar" className="img" />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  )
}
