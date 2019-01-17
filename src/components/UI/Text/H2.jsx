import styled from 'styled-components'
import { colors as basedColors } from './../../../shared'

const {list: colors} = basedColors

const H2 = styled.h2`
color: ${props => colors[props.color]};
text-align: ${props => props.align};
&::after{
    display: block;
    content: '';
    width: 100%;
    height: 1px;
    border: 0;
    border-top: 1px solid #eee;
    margin: 1em 0;
    padding: 0;
}
`

H2.defaultProps = {
  color: 'BlueDawn',
  align: ''
}

export default H2
