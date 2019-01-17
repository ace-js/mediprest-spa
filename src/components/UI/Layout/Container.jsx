import styled from 'styled-components'
import PropTypes from 'prop-types'
import { breakpoints } from './../../../shared'

const { device } = breakpoints

const Container = styled.div.attrs({
  className: 'Container'
})`
  margin: 0 auto;
  position: relative;
  width: 100%;
  z-index: 1;
  margin-left: auto;
  margin-right: auto;
  padding-left: 0;
  padding-right: 0;
  &::after {
    content: "";
    display: table;
    clear: both;
  }
  ${props => !props.fluid && `
    @media ${device.mobileL} {
      & {
        width: 540px;
        max-width: 100%;
      }
    }
    @media ${device.tablet} {
      & {
        width: 720px;
        max-width: 100%;
      }
    }
    @media ${device.tabletL} {
      & {
        width: 960px;
        max-width: 100%;
      }
    }
    @media ${device.desktop} {
      & {
        width: 1140px;
        max-width: 100%;
      }
  }`}
  ${props => props.fluid && `
    width: 100%;
    &::after {
      content: "";
      display: table;
      clear: both;
    }
  `}
`

Container.propTypes = {
  fluid: PropTypes.bool
}

Container.defaultProps = {
  fluid: false
}

Container.docProps = {
  fluid: `Enable fluid design`
}

export default Container
