import styled from 'styled-components'

const Grid = styled.div.attrs({
  className: 'Grid'
})`
 display: grid;
 grid-template-columns: 100%;
 grid-template-rows: ${props => props.templateRMobile};
 grid-template-areas: ${props => props.templateAMobile};
 @media (min-width: 960px) {
    grid-template-columns: ${props => props.templateCDesktop};
    grid-template-rows: ${props => props.templateRDesktop};
    grid-template-areas: ${props => props.templateADesktop};
 }
`

Grid.defaultProps = {
  templateRDesktop: '1fr'
}
export default Grid
