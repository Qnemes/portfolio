import styled from 'styled-components'

export const StyledMenu = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`

export const StyledHamburgerButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.flexCenter};
    position: relative;
    z-index: 10;
    margin-right: -15px;
    padding: 15px;
    border: 0;
    background-color: transparent;
    color: inherit;
    text-transform: none;
    transition-timing-function: linear;
    transition-duration: 0.15s;
    transition-property: opacity, filter;
  }

  .ham-box {
    display: inline-block;
    position: relative;
    width: ${(props) => props.theme.hamburgerWidth};
    height: 24px;
  }

  .ham-box-inner {
    position: absolute;
    top: 50%;
    right: 0;
    width: ${(props) => props.theme.hamburgerWidth};
    height: 2px;
    border-radius: ${(props) => props.theme.borderRadius};
    background-color: ${(props) => props.theme.brand.primary};
    transition-duration: 0.22s;
    transition-property: transform;
    transition-delay: ${(props) => (props.menuOpen ? '0.12s' : '0s')};
    transform: rotate(${(props) => (props.menuOpen ? '225deg' : '0deg')});
    transition-timing-function: cubic-bezier(
      ${(props) => (props.menuOpen ? '0.215, 0.61, 0.355, 1' : '0.55, 0.055, 0.675, 0.19')}
    );
    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      left: auto;
      right: 0;
      width: ${(props) => props.theme.hamburgerWidth};
      height: 2px;
      border-radius: 4px;
      background-color: ${(props) => props.theme.brand.primary};
      transition-timing-function: ease;
      transition-duration: 0.15s;
      transition-property: transform;
    }
    &:before {
      width: ${(props) => (props.menuOpen ? '100%' : '80%')};
      top: ${(props) => (props.menuOpen ? '0' : '-10px')};
      opacity: ${(props) => (props.menuOpen ? 0 : 1)};
      transition: ${({ menuOpen, theme }) =>
        menuOpen ? theme.transitions.hamBeforeActive : theme.transitions.hamBefore};
    }
    &:after {
      width: ${(props) => (props.menuOpen ? '100%' : '80%')};
      bottom: ${(props) => (props.menuOpen ? '0' : '-10px')};
      transform: rotate(${(props) => (props.menuOpen ? '-90deg' : '0')});
      transition: ${({ menuOpen, theme }) =>
        menuOpen ? theme.transitions.hamAfterActive : theme.transitions.hamAfter};
    }
  }
`

export const StyledSidebar = styled.aside`
  display: none;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.flexCenter};
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    padding: 50px 10px;
    width: min(75vw, 400px);
    height: 100vh;
    outline: 0;
    background-color: ${(props) => props.theme.bg.defaultLight};
    box-shadow: ${(props) => props.theme.shadows.default};
    z-index: 9;
    transform: translateX(${(props) => (props.menuOpen ? 0 : 100)}vw);
    visibility: ${(props) => (props.menuOpen ? 'visible' : 'hidden')};
    transition: ${(props) => props.theme.transitions.default};

    nav {
      ${({ theme }) => theme.mixins.flexBetween};
      width: 100%;
      flex-direction: column;
      color: ${(props) => props.theme.text.accent};
      font-family: ${(props) => props.theme.fontFamily.fontMono};
      text-align: center;
    }

    ol {
      padding: 0;
      margin: 0;
      list-style: none;
      width: 100%;

      li {
        position: relative;
        margin: 0 auto 20px;
        counter-increment: item 1;
        font-size: clamp(${(props) => props.theme.fontSize.sm}, 4vw, ${(props) => props.theme.fontSize.lg});

        &:before {
          content: '0' counter(item) '.';
          display: block;
          margin-bottom: 5px;
          color: ${(props) => props.theme.brand.primary};
          font-size: ${(props) => props.theme.fontSize.xs};
        }
      }

      @media (max-width: 600px) {
        margin: 0 auto 10px;
      }
    }

    a {
      ${({ theme }) => theme.mixins.link};
      width: 100%;
      padding: 3px 20px 20px;
    }
  }

  .resume-link {
    ${({ theme }) => theme.mixins.bigButton};
    padding: 18px 50px;
    margin: 10% auto 0;
    width: max-content;
  }

  .theme-button {
    cursor: pointer;
    margin: 10% auto 0;
    width: max-content;
  }

  .theme-button input {
    display: none;
  }

  .theme-button input + div {
    border-radius: 50%;
    width: 36px;
    height: 36px;
    position: relative;
    box-shadow: inset 14px -14px 0 0 var(--color-toggle-dark, #000);
    transform: scale(1) rotate(-2deg);
    transition:
      box-shadow 0.5s ease 0s,
      transform 0.4s ease 0.1s;
  }

  .theme-button input + div::before {
    content: '';
    width: inherit;
    height: inherit;
    border-radius: inherit;
    position: absolute;
    left: 0;
    top: 0;
    transition: background 0.3s ease;
  }

  .theme-button input + div::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow:
      0 -23px 0 var(--color-toggle-light, #eee),
      0 23px 0 var(--color-toggle-light, #eee),
      23px 0 0 var(--color-toggle-light, #eee),
      -23px 0 0 var(--color-toggle-light, #eee),
      15px 15px 0 var(--color-toggle-light, #eee),
      -15px 15px 0 var(--color-toggle-light, #eee),
      15px -15px 0 var(--color-toggle-light, #eee),
      -15px -15px 0 var(--color-toggle-light, #eee);
    transform: scale(0);
    transition: all 0.3s ease;
  }

  .theme-button input:checked + div {
    box-shadow: inset 32px -32px 0 0 #fff;
    transform: scale(0.5) rotate(0deg);
    transition:
      transform 0.3s ease 0.1s,
      box-shadow 0.2s ease 0s;
  }

  .theme-button input:checked + div::before {
    background: var(--color-toggle-light, #eee);
    transition: background 0.3s ease 0.1s;
  }

  .theme-button input:checked + div::after {
    transform: scale(1.5);
    transition: transform 0.5s ease 0.15s;
  }
`
