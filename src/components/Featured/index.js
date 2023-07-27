import { NumberedHeading } from '@common/styles'
import { featuredProjects } from '@config'
import { useEffect, useRef } from 'react'
import { StyledProject, StyledProjectLinks, StyledProjectImgWrapper, StyledProjectImage } from './styles'
import { scrollRevealConfig } from '@config/scrollReveal'

export const Featured = () => {
  const revealTitle = useRef(null)
  const revealProjects = useRef([])

  useEffect(() => {
    async function animate() {
      if (revealTitle.current && revealProjects.current) {
        const scrollReveal = (await import('scrollreveal')).default
        scrollReveal().reveal(revealTitle.current, scrollRevealConfig())
        revealProjects.current.forEach((ref, i) => scrollReveal().reveal(ref, scrollRevealConfig(i * 100)))
      }
    }
    animate()
  }, [])

  return (
    <section id="projects">
      <NumberedHeading ref={revealTitle}>Some Projects I’ve Built</NumberedHeading>

      <div>
        {featuredProjects?.map(({ title, external, techs, github, cover, descriptionHtml }, i) => {
          return (
            <StyledProject key={title} ref={(el) => (revealProjects.current[i] = el)}>
              <div className="project-content">
                <p className="project-overline">Featured Project</p>
                <h3 className="project-title">{title}</h3>
                <div className="project-description" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />

                {techs.length ? (
                  <ul className="project-tech-list">
                    {techs.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                ) : null}

                <StyledProjectLinks>
                  {github ? (
                    <a rel="noreferrer" target="_blank" href={github} aria-label="GitHub Link">
                      <svg>
                        <use xlinkHref="icons.svg#github"></use>
                      </svg>
                    </a>
                  ) : null}
                  {external ? (
                    <a rel="noreferrer" target="_blank" href={external} aria-label="External Link">
                      <svg>
                        <use xlinkHref="icons.svg#external"></use>
                      </svg>
                    </a>
                  ) : null}
                </StyledProjectLinks>
              </div>

              <StyledProjectImgWrapper>
                <a href={external || github || '#'}>
                  <div className="img-wrapper">
                    <div className="img-cont" />
                    <StyledProjectImage src={cover} alt={title} className="img" />
                  </div>
                </a>
              </StyledProjectImgWrapper>
            </StyledProject>
          )
        })}
      </div>
    </section>
  )
}
