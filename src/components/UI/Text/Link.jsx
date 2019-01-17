import styled from 'styled-components'
import { colors as basedColors } from './../../../shared'

const { list: colors } = basedColors

const Link = styled.a`
  text-decoration: none;
  color: ${props => colors[props.color]};
  display: ${props => props.display};
  cursor: pointer;
  align-items: ${props => {
    switch (props.verticalAlign) {
      case 'top':
        return 'flex-start'
      case 'middle':
        return 'center'
      case 'bottom':
        return 'flex-end'
      case 'stretch':
        return 'stretch'
    }
  }}
  
    justify-content: ${props => {
      switch (props.horizontalAlign) {
        case 'right':
          return 'flex-end'
        case 'center':
          return 'center'
        case 'between':
          return 'space-between'
        case 'around':
          return 'space-around'
        case 'left':
          return 'flex-start'
      }
    }}
`

Link.defaultProps = {
  color: 'Black',
  display: 'block'
}

export default Link
