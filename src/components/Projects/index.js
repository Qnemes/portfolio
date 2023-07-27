import { projects } from '@config'
import { useEffect, useState, useRef } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { PROJECTS_GRID_LIMIT, IS_PRODUCTION } from '@lib/constants'
import * as gtag from '@lib/gtag'
import { StyledProject, StyledProjectsSection } from './styles'
import { scrollRevealConfig } from '@config/scrollReveal'

export const Projects = () => {
  const [showMore, setShowMore] = useState(false)
  const firstSix = projects.slice(0, PROJECTS_GRID_LIMIT)
  const projectsToShow = showMore ? projects : firstSix

  const revealTitle = useRef(null)
  const revealArchiveLink = useRef(null)
  const revealProjects = useRef([])

  useEffect(() => {
    async function animate() {
      if (revealTitle.current) {
        const scrollReveal = (await import('scrollreveal')).default
        scrollReveal().reveal(revealTitle.current, scrollRevealConfig())
        scrollReveal().reveal(revealArchiveLink.current, scrollRevealConfig())
        revealProjects.current.forEach((ref, i) => scrollReveal().reveal(ref, scrollRevealConfig(i * 100)))
      }
    }
    animate()
  }, [])

  const handleClickProject = (link) => {
    if (IS_PRODUCTION) {
      gtag.event('click_project', 'projects', 'user clicked on project link button', link)
    }
    window.open(link, '_blank')
  }

  return (
    <StyledProjectsSection>
      <div className="title-container" ref={revealTitle}>
        <h2>Other Projects</h2>
      </div>
      <TransitionGroup className="projects-grid">
        {projectsToShow?.map(({ title, descriptionHtml, github, external, techs }, i) => {
          return (
            <CSSTransition
              key={title}
              classNames="fadeup"
              timeout={i >= PROJECTS_GRID_LIMIT ? (i - PROJECTS_GRID_LIMIT) * 300 : 300}
              exit={false}
            >
              <StyledProject
                key={title}
                ref={(el) => {
                  revealProjects.current[i] = el
                }}
                tabIndex="0"
                style={{
                  transitionDelay: `${i >= PROJECTS_GRID_LIMIT ? (i - PROJECTS_GRID_LIMIT) * 100 : 0}ms`,
                }}
              >
                <div className="project-inner">
                  <header>
                    <div className="project-top">
                      <div className="folder">
                        <svg>
                          <use xlinkHref="icons.svg#folder"></use>
                        </svg>
                      </div>
                      <div className="project-links">
                        {github ? (
                          <a onClick={() => handleClickProject(github)} aria-label="GitHub Link">
                            <svg>
                              <use xlinkHref="icons.svg#github"></use>
                            </svg>
                          </a>
                        ) : null}
                        {external ? (
                          <a onClick={() => handleClickProject(external)} aria-label="External Link">
                            <svg>
                              <use xlinkHref="icons.svg#external"></use>
                            </svg>
                          </a>
                        ) : null}
                      </div>
                    </div>

                    <h3 className="project-title">{title}</h3>

                    <div className="project-description" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
                  </header>

                  <footer>
                    {techs.length ? (
                      <ul className="project-tech-list">
                        {techs.map((tech) => (
                          <li key={tech}>{tech}</li>
                        ))}
                      </ul>
                    ) : null}
                  </footer>
                </div>
              </StyledProject>
            </CSSTransition>
          )
        })}
      </TransitionGroup>
      {projects?.length > 6 ? (
        <button type="button" className="more-button" onClick={() => setShowMore(!showMore)}>
          Show {showMore ? 'Less' : 'More'}
        </button>
      ) : null}
    </StyledProjectsSection>
  )
}
