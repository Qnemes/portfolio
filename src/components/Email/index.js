import { email } from '@config'
import { Side } from '@components/Side'
import { StyledLinkWrapper } from './styles'

export const Email = ({ isHome }) => (
  <Side isHome={isHome} orientation="right">
    <StyledLinkWrapper>
      <a href={`mailto:${email}`}>{email}</a>
    </StyledLinkWrapper>
  </Side>
)
