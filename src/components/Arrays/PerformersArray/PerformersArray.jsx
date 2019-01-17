import React from 'react'
import PropTypes from 'prop-types'
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination, Checkbox, Paper } from '@material-ui/core'

const performersArray = (props) => {
  const rows = props.performers.map((performer, index) => (
    <TableRow hover key={index} selected={props.selectedIndex === index}>
      <TableCell padding='checkbox'>
        <Checkbox onChange={() => props.onSelect(index)} checked={props.selectedIndex === index} />
      </TableCell>
      <TableCell>
        {performer.inami}
      </TableCell>
      <TableCell>
        {performer.name}
      </TableCell>
      <TableCell>
        {performer.firstname}
      </TableCell>
    </TableRow>
  ))

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sélectionner </TableCell>
            <TableCell>Inami</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Prénom</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
      <TablePagination
        component='div'
        labelRowsPerPage='Nombre de lignes par page:'
        count={props.count}
        page={props.page}
        rowsPerPageOptions={[5, 10, 25, 50]}
        rowsPerPage={props.rowsPerPage}
        onChangePage={props.changePage}
        onChangeRowsPerPage={props.changeRowsPerPage} />
    </Paper>
  )
}

performersArray.propTypes = {
  onSelect: PropTypes.func.isRequired,
  performers: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  count: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  changePage: PropTypes.func.isRequired,
  changeRowsPerPage: PropTypes.func.isRequired
}

performersArray.defaultProps = {
  count: 50,
  page: 0,
  rowsPerPage: 10
}
export default performersArray
