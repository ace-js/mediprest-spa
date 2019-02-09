import styled from 'styled-components'
import PropTypes from 'prop-types'
import { spacings, utility, colors as basedColors } from './../../../shared'
import { AutoComplete } from 'material-ui';

const { list: colors } = basedColors
const { getValueForKey } = utility

const Block = styled.div.attrs({
  className: 'Block'
})`
  min-width: ${props => props.minWidth};
  box-sizing: border-box;
  background-color: ${props => props.bgColorMUI ? props.bgColorMUI : colors[props.bgColor]};
  border: ${props => props.border};
  border-color: ${props => colors[props.borderColor]};
  border-radius: ${props => props.radius};
  flex: ${props => props.flex ? props.flex : '0 1 ' + props.width};
  height: ${props => props.height};
  max-width: ${props => props.maxWidth};
  min-height: ${props => props.minHeight};
  max-height: ${props => props.maxHeight};
  position: relative;
  text-align: ${props => props.center ? 'center' : props.right ? 'right' : 'left'};
  width: ${props => props.width};
  z-index: 1;
  margin: 0;
  overflow-y: ${props => props.overflowY};
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
  `

Block.propTypes = {
  bgColor: PropTypes.string,
  borderColor: PropTypes.string,
  center: PropTypes.bool,
  height: PropTypes.string,
  flex: PropTypes.string,
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
  width: PropTypes.string
}

Block.defaultProps = {
  bgColor: 'Transparent',
  bgColorMUI: null,
  border: '0',
  borderColor: 'Transparent',
  center: false,
  height: 'auto',
  margin: 'zero',
  marginBottom: undefined,
  marginHorizontal: undefined,
  marginLeft: undefined,
  marginRight: undefined,
  marginTop: undefined,
  marginVertical: undefined,
  maxWidth: '100%',
  minHeight: '0',
  maxHeight: 'auto',
  minWidth: '1px',
  overflowY: 'auto',
  padding: 'zero',
  paddingBottom: undefined,
  paddingHorizontal: undefined,
  paddingLeft: undefined,
  paddingRight: undefined,
  paddingTop: undefined,
  paddingVertical: undefined,
  radius: '0',
  right: false,
  width: 'auto'
}

Block.docProps = {
  bgColor: `Use a custom background-color`,
  center: `Centers the text`,
  flex: `Sets the flex property`,
  height: `Adds a height`,
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
  width: `Adds a width and flex width`
}

export default Block
