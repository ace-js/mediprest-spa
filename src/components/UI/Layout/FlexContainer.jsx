import styled from 'styled-components'
import PropTypes from 'prop-types'

import { spacings, utility, colors as basedColors } from './../../../shared'

const {list: colors} = basedColors
const {getValueForKey} = utility

const FlexContainer = styled.div.attrs({
  className: 'FlexContainer'
})`
  .LabelInputText + & {
    margin-top: 1rem;
  }
  background-color: ${props => props.bgColorMUI ? props.bgColorMUI : colors[props.bgColor]};
  border: ${props => props.border};
  border-color: ${props => colors[props.borderColor]};
  border-radius: ${props => props.radius};
  box-sizing: border-box;
  flex: ${props => props.flex ? props.flex : `${props.display === 'inline-flex'
    ? '0'
    : '1'} 0 ${props.minWidth ? props.minWidth : 'auto'}`};
  height: ${props => props.height};
  margin: 0;
  max-width: ${props => props.maxWidth};
  min-height: ${props => props.minHeight};
  min-width: ${props => props.minWidth ? props.minWidth : '1px'};
  position: relative;
  text-align: ${props => props.center ? 'center' : props.right
    ? 'right'
    : 'left'};
  width: ${props => props.width ? props.width : props.display === 'inline-flex'
    ? 'auto'
    : '100%'};
  z-index: ${props => props.zIndex};
  margin-left: ${props => props.display === 'inline-flex' ? '0' : 'auto'};
  margin-right: ${props => props.display === 'inline-flex' ? '0' : 'auto'};
  ${props => getValueForKey('margin', spacings, props.margin)}
  ${props => getValueForKey('margin-bottom', spacings, props.marginBottom)}
  ${props => getValueForKey('margin-bottom', spacings, props.marginVertical)}
  ${props => getValueForKey('margin-left', spacings, props.marginLeft)}
  ${props => getValueForKey('margin-left', spacings, props.marginHorizontal)}
  ${props => getValueForKey('margin-right', spacings, props.marginRight)}
  ${props => getValueForKey('margin-right', spacings, props.marginHorizontal)}
  ${props => getValueForKey('margin-top', spacings, props.marginTop)}
  ${props => getValueForKey('margin-top', spacings, props.marginVertical)}
  padding: 0;
  ${props => getValueForKey('padding', spacings, props.padding)}
  ${props => getValueForKey('padding-bottom', spacings, props.paddingBottom)}
  ${props => getValueForKey('padding-bottom', spacings, props.paddingVertical)}
  ${props => getValueForKey('padding-left', spacings, props.paddingLeft)}
  ${props => getValueForKey('padding-left', spacings, props.paddingHorizontal)}
  ${props => getValueForKey('padding-right', spacings, props.paddingRight)}
  ${props => getValueForKey('padding-right', spacings, props.paddingHorizontal)}
  ${props => getValueForKey('padding-top', spacings, props.paddingTop)}
  ${props => getValueForKey('padding-top', spacings, props.paddingVertical)}
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
  }};
  display: ${props => {
    switch (props.display) {
      case 'inline-flex':
        return 'inline-flex'
      case 'flex':
        return 'flex'
    }
  }};
  flex-direction: ${props => {
    switch (props.direction) {
      case 'column':
        return 'column'
      case 'row':
        return 'row'
    }
  }};
  flex-wrap: ${props => {
    switch (props.wrap) {
      case 'wrap':
        return 'wrap'
      case 'nowrap':
        return 'nowrap'
    }
  }};
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
  &.responsive {
    @media (max-width: 960px) {
    display: block;
    width: auto;
    & > * {
      margin-top: 1rem !important;
      width: 100% !important;
    }
  }
  }
`

FlexContainer.propTypes = {
  bgColor: PropTypes.oneOf(Object.keys(colors)),
  center: PropTypes.bool,
  direction: PropTypes.oneOf(['column', 'row']),
  display: PropTypes.oneOf(['flex', 'inline-flex']),
  flex: PropTypes.string,
  height: PropTypes.string,
  horizontalAlign: PropTypes.oneOf(
    ['around', 'between', 'center', 'left', 'right']),
  margin: PropTypes.string,
  marginBottom: PropTypes.string,
  marginHorizontal: PropTypes.string,
  marginLeft: PropTypes.string,
  marginRight: PropTypes.string,
  marginTop: PropTypes.string,
  marginVertical: PropTypes.string,
  maxWidth: PropTypes.string,
  minHeight: PropTypes.string,
  minWidth: PropTypes.string,
  padding: PropTypes.string,
  paddingBottom: PropTypes.string,
  paddingHorizontal: PropTypes.string,
  paddingLeft: PropTypes.string,
  paddingRight: PropTypes.string,
  paddingTop: PropTypes.string,
  paddingVertical: PropTypes.string,
  radius: PropTypes.string,
  right: PropTypes.bool,
  verticalAlign: PropTypes.oneOf(['bottom', 'middle', 'stretch', 'top']),
  width: PropTypes.string,
  wrap: PropTypes.oneOf(['nowrap', 'wrap']),
  zIndex: PropTypes.string
}

FlexContainer.defaultProps = {
  bgColor: 'Transparent',
  center: false,
  direction: 'row',
  display: 'flex',
  height: 'auto',
  horizontalAlign: 'left',
  margin: 'zero',
  marginBottom: undefined,
  marginHorizontal: undefined,
  marginLeft: undefined,
  marginRight: undefined,
  marginTop: undefined,
  marginVertical: undefined,
  maxWidth: '100%',
  minHeight: '0',
  minWidth: undefined,
  padding: 'zero',
  paddingBottom: undefined,
  paddingHorizontal: undefined,
  paddingLeft: undefined,
  paddingRight: undefined,
  paddingTop: undefined,
  paddingVertical: undefined,
  radius: '0',
  right: false,
  verticalAlign: 'stretch',
  width: undefined,
  wrap: 'nowrap',
  zIndex: '1'
}

FlexContainer.docProps = {
  bgColor: `Use a custom background-color`,
  center: `Centers the text`,
  direction: `Sets the flex-direction`,
  display: `Sets the display`,
  flex: `Sets the flex property`,
  height: `Adds a height`,
  horizontalAlign: `Sets the justify-content`,
  margin: `Adds a margin: See Styles > Spacings page`,
  marginBottom: `Adds a margin-bottom: See Styles > Spacings page`,
  marginHorizontal: `Adds a margin horizontally (left & right): See Styles > Spacings page`,
  marginLeft: `Adds a margin-left: See Styles > Spacings page`,
  marginRight: `Adds a margin-right: See Styles > Spacings page`,
  marginTop: `Adds a margin-top: See Styles > Spacings page`,
  marginVertical: `Adds a margin vertically (bottom & top): See Styles > Spacings page`,
  maxWidth: `Adds a max-width`,
  minHeight: `Adds a min-height`,
  minWidth: `Adds a min-width`,
  padding: `Adds a padding: See Styles > Spacings page`,
  paddingBottom: `Adds a padding-bottom: See Styles > Spacings page`,
  paddingHorizontal: `Adds a padding horizontally (left & right): See Styles > Spacings page`,
  paddingLeft: `Adds a padding-left: See Styles > Spacings page`,
  paddingRight: `Adds a padding-right: See Styles > Spacings page`,
  paddingTop: `Adds a padding-top: See Styles > Spacings page`,
  paddingVertical: `Adds a padding vertically (bottom & top): See Styles > Spacings page`,
  radius: `Adds a border-radius`,
  right: `Right aligns the text`,
  verticalAlign: `Sets the align-items`,
  width: `Adds a width and flex width`,
  wrap: `Sets the flex-wrap`,
  zIndex: `Adds a zIndex`
}

export default FlexContainer
