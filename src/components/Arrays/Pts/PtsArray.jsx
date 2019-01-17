import React from 'react'
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  withStyles
} from '@material-ui/core'
import { noop } from 'lodash'

import PtsRow from './PtsRow'
import HeaderTableCell, {
  HeaderTableCellSortable
} from '../../UI/Custom/HeaderTableCell'
import { constants, utility } from './../../../shared'

const { tableStyle } = utility

const renderCheckboxHeader = contextType => {
  switch (contextType) {
    case constants.CONTEXT.VALIDATION:
      return <HeaderTableCell>Valider</HeaderTableCell>
    case constants.CONTEXT.FACTURATION:
      return <HeaderTableCell>Facturer</HeaderTableCell>
    default:
      return null
  }
}
const PtsArray = ({
  pts,
  contextType,
  onValidate,
  sortSubject,
  order,
  onSort,
  onOpenModal,
  page,
  pages,
  total,
  limit,
  onChangeRowsPerPage,
  onPageChange,
  classes
}) => (
  <Paper className={classes.root}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          {renderCheckboxHeader(contextType)}
          <HeaderTableCellSortable
            onSort={onSort}
            label={'Type'}
            sortSubject={constants.FILTER.ORDER_BY.CONTACT_TYPE}
            active={sortSubject === constants.FILTER.ORDER_BY.CONTACT_TYPE}
            order={order}
          />
          <HeaderTableCellSortable
            onSort={onSort}
            label={'Contact'}
            sortSubject={constants.FILTER.ORDER_BY.CONTACT}
            active={sortSubject === constants.FILTER.ORDER_BY.CONTACT}
            order={order}
          />
          <HeaderTableCellSortable
            onSort={onSort}
            label={'Date'}
            sortSubject={constants.FILTER.ORDER_BY.PRESTATION_DATE}
            active={sortSubject === constants.FILTER.ORDER_BY.PRESTATION_DATE}
            order={order}
          />
          <HeaderTableCellSortable
            onSort={onSort}
            label={'Code prestation'}
            sortSubject={constants.FILTER.ORDER_BY.PRESTATION}
            active={sortSubject === constants.FILTER.ORDER_BY.PRESTATION}
            order={order}
          />
          <HeaderTableCellSortable
            onSort={onSort}
            label={'Patient'}
            sortSubject={constants.FILTER.ORDER_BY.PATIENT}
            active={sortSubject === constants.FILTER.ORDER_BY.PATIENT}
            order={order}
          />
          <HeaderTableCell>Actions</HeaderTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {pts.map(item => (
          <PtsRow
            cssClass={classes.row}
            key={item._id}
            pts={item}
            contextType={contextType}
            onOpenModal={onOpenModal}
            onValidate={onValidate}
          />
        ))}
      </TableBody>
    </Table>
    <TablePagination
      component='div'
      labelRowsPerPage='Nombre de lignes par page:'
      count={total}
      page={page}
      rowsPerPageOptions={[5, 10, 25, 50]}
      rowsPerPage={limit}
      onChangePage={(e, value) =>
        (value + 1 <= pages || value === 0 ? onPageChange(value + 1) : noop())}
      onChangeRowsPerPage={onChangeRowsPerPage}
    />
  </Paper>
)

export default withStyles(tableStyle)(PtsArray)
