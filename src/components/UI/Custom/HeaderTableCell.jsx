import PropTypes from 'prop-types'
import {
  TableCell,
  Tooltip,
  TableSortLabel,
  withStyles
} from '@material-ui/core'
import * as colors from '@material-ui/core/colors'
import React from 'react'

const HeaderTableCell = withStyles(() => ({
  head: {
    backgroundColor: colors.blue[500],
    color: '#ffff',
    textAlign: 'center'
  },
  body: {
    fontSize: 14,
    color: '#ffff'
  }
}))(TableCell)

export default HeaderTableCell

export const HeaderTableCellSortable = ({active, order, label, sortSubject, onSort }) => (
  <HeaderTableCell sortDirection={order}>
    <Tooltip disableFocusListener enterDelay={100} leaveDelay={100} title={`Ordonner par ${label}`}>
      <TableSortLabel style={{color: 'white'}} active={active} direction={order} onClick={() => onSort(sortSubject)}> {label} </TableSortLabel>
    </Tooltip>
  </HeaderTableCell>
)

HeaderTableCellSortable.propTypes = {
  active: PropTypes.bool,
  order: PropTypes.string,
  label: PropTypes.string.isRequired,
  sortSubject: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired
}

HeaderTableCellSortable.defaultProps = {
  active: false,
  order: 'asc'
}
