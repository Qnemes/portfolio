import { NumberedHeading } from '@common/styles'
import { email } from '@config'
import { useEffect, useRef } from 'react'
import { StyledContactSection } from './styles'
import { scrollRevealConfig } from '@config/scrollReveal'

export const Contact = () => {
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
    <StyledContactSection id="contact" ref={revealContainer}>
      <NumberedHeading overline>What&apos;s Next?</NumberedHeading>

      <h2 className="title">Get In Touch</h2>

      <p>
        Currently I&apos;m looking for any new opportunities, my inbox is always open. Whether you have a question
        or just want to say hi, I&apos;ll try my best to get back to you!
      </p>

      <a className="email-link" href={`mailto:${email}`}>
        Say Hello
      </a>
    </StyledContactSection>
  )
}
