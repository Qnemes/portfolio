import { socialMedia } from '@config'
import { Side } from '@components/Side'
import { StyledSocialList } from './styles'

export const Social = ({ isHome }) => (
  <Side isHome={isHome} orientation="left">
    <StyledSocialList>
      {socialMedia?.map(({ url, name }) => (
        <li key={name}>
          <a rel="noreferrer" target="_blank" href={url} aria-label={name}>
            <svg>
              <use xlinkHref={`icons.svg#${name.toLowerCase()}`}></use>
            </svg>
          </a>
        </li>
      ))}
    </StyledSocialList>
  </Side>
)
