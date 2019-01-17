import styled from 'styled-components'
import PropTypes from 'prop-types'

import { colors as basedColors } from './../../../shared'

const { list: colors } = basedColors

const Text = styled.p.attrs({
  className: 'Text'
})`
 font-size: ${props => props.size};
 color: ${props => colors[props.color]};
 font-weight: ${props => props.weight};
 line-height: ${props => props.lineHeight};
 text-align: ${props => props.align};
`
Text.propTypes = {
  color: PropTypes.oneOf(Object.keys(colors))
}
Text.defaultProps = {
  size: '14px',
  color: 'BlueDark',
  lineHeight: '10px'
}

export default Text
