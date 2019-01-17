import styled from 'styled-components'
import {colors} from '@material-ui/core'
import { Block } from './../../../components/UI/Layout'

const ItemWrapper = styled(Block).attrs({
  className: 'ItemWrapper'
})`
  cursor: pointer;
  &:hover {
      background-color : ${colors.grey[100]};
  }
  &.active {
      background-color: ${colors.grey[200]};
      cursor: not-allowed;
  }
`

ItemWrapper.defaultProps = {
  width: '100%',
  height: '4rem',
  border: '1px solid',
  borderColor: 'GreyWhite'
}

export default ItemWrapper
