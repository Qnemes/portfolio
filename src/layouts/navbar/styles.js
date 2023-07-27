import { NAV_SCROLL_HEIGHT, NAV_SCROLL_HEIGHT_MOBILE, NAV_HEIGHT } from '@lib/constants'
import styled, { css } from 'styled-components'

export const StyledHeader = styled.header`
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 0;
  z-index: 11;
  padding: 0px 50px;
  width: 100%;
  height: ${NAV_HEIGHT}px;
  background-color: ${(props) => props.theme.bg.default};
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  transition: ${(props) => props.theme.transitions.default};
  ${(props) =>
    props.scrollDirection === 'up' &&
    !props.scrolledToTop &&
    css`
      height: ${NAV_SCROLL_HEIGHT}px;
      transform: translateY(0px);
      box-shadow: ${props.theme.shadows.default};
      @media (max-width: ${props.theme.breakpoints.sm}) {
        height: ${NAV_SCROLL_HEIGHT_MOBILE}px;
      }
    `};

  ${(props) =>
    props.scrollDirection === 'down' &&
    !props.scrolledToTop &&
    css`
      height: ${NAV_SCROLL_HEIGHT};
      transform: translateY(calc(${NAV_SCROLL_HEIGHT}px * -1));
      box-shadow: ${props.theme.shadows.default};
      @media (max-width: ${props.theme.breakpoints.sm}) {
        height: ${NAV_SCROLL_HEIGHT_MOBILE}px;
      }
    `};

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    padding: 0 40px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 0 25px;
  }
`

export const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween};
  position: relative;
  width: 100%;
  color: ${(props) => props.theme.text.default};
  font-family: ${(props) => props.theme.fontFamily.fontMono};
  counter-reset: item 0;
  z-index: 12;

  .logo {
    ${({ theme }) => theme.mixins.flexCenter};
    cursor: pointer;
    a {
      color: ${(props) => props.theme.text.default};
      width: 42px;
      height: 42px;

      &:hover,
      &:focus {
        svg {
          fill: white;
        }
      }

      svg {
        fill: none;
        transition: ${(props) => props.theme.transitions.default};
        user-select: none;
      }
    }
  }
`

export const StyledLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: none;
  }

  ol {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 0 5px;
      position: relative;
      counter-increment: item 1;
      font-size: ${(props) => props.theme.fontSize.xs};

      a {
        padding: 10px;

        &:hover,
        &:focus,
        &:active {
          color: ${(props) => props.theme.brand.primary};
          outline: 0;
          &:after {
            width: 100%;
          }
          & > * {
            color: ${(props) => props.theme.brand.primary} !important;
            transition: ${(props) => props.theme.transitions.default};
          }
        }
        &:after {
          content: '';
          display: block;
          width: 0;
          height: 2px;
          position: relative;
          top: 0.2em;
          background-color: ${(props) => props.theme.brand.primary};
          transition: ${(props) => props.theme.transitions.default};
          opacity: 0.5;
        }

        &:before {
          content: '0' counter(item) '.';
          margin-right: 5px;
          color: ${(props) => props.theme.brand.primary};
          font-size: ${(props) => props.theme.fontSize.xs};
          text-align: right;
        }
      }
    }
  }

  .resume-button {
    ${({ theme }) => theme.mixins.smallButton};
    margin-left: 1.25rem;
    font-size: ${(props) => props.theme.fontSize.sm};
  }

  .theme-button {
    cursor: pointer;
    margin-left: 2rem;
  }

  .theme-button input {
    display: none;
  }

  .theme-button input + div {
    border-radius: 50%;
    width: 34px;
    height: 34px;
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
