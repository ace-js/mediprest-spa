import styled from 'styled-components'
import { spacings, utility, colors as basedColors } from './../../../shared'

const { list: colors } = basedColors
const { getValueForKey } = utility

const H4 = styled.h4`
color: ${props => colors[props.color]};
font-size: ${props => props.size};
margin: 0;
${props => getValueForKey('margin', spacings, props.margin)}
${props => getValueForKey('margin-bottom', spacings, props.marginBottom)}
${props => getValueForKey('margin-bottom', spacings, props.marginVertical)}
${props => getValueForKey('margin-left', spacings, props.marginLeft)}
${props => getValueForKey('margin-left', spacings, props.marginHorizontal)}
${props => getValueForKey('margin-right', spacings, props.marginRight)}
${props => getValueForKey('margin-right', spacings, props.marginHorizontal)}
${props => getValueForKey('margin-top', spacings, props.marginTop)}
${props => getValueForKey('margin-top', spacings, props.marginVertical)}
`
H4.defaultProps = {
  color: 'BlueSky',
  size: '1.4rem',
  margin: 'zero',
  marginBottom: undefined,
  marginHorizontal: undefined,
  marginLeft: undefined,
  marginRight: undefined,
  marginTop: undefined,
  marginVertical: undefined
}

export default H4
