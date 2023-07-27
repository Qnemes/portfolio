import { MainContainer } from './styles'

export const Main = ({ id, children, className }) => (
  <MainContainer id={id} className={className}>
    {children}
  </MainContainer>
)
