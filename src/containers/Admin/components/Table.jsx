import React from 'react'
import {
  Checkbox,
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import uuid from 'uuid'

import { utility } from './../../../shared'
import HeaderTableCell from '../../../components/UI/Custom/HeaderTableCell'

const renderBodyItems = (items, context, onCheck, activeItems) => items.map(item => {
    const isCheck = context === 'DELEGATIONS' 
    ? activeItems.findIndex(innerItem => item._id === innerItem) !== -1 
    : item.isFavorite

    const keys = context === 'DELEGATIONS' ? Object.keys(item).filter(key => key !== '_id') : Object.keys(item).filter(key => key !== 'isFavorite')
    return (
        <TableRow key={uuid.v1()} hover> 
            <TableCell style={{textAlign: 'center'}}>
                <Checkbox checked={isCheck} onChange={() => onCheck(item._id)} />
            </TableCell>
            {keys.map((key) => (
                <TableCell key={uuid.v1()} style={{textAlign: 'center'}}>
                     {typeof item[key] === 'object' ? item[key].name : item[key]}
                </TableCell>
            ))}
        </TableRow>
    )
})

const TableAdmin = ({ headers, items, onCheck, classes, context, activeItems }) => {
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <HeaderTableCell key={uuid.v1()}>{header} </HeaderTableCell>
          ))}
        </TableRow>
      </TableHead>
        <TableBody>
                  {renderBodyItems(items, context, onCheck, activeItems)}
        </TableBody>
    </Table>
  )
}

export default withStyles(utility.tableStyle)(TableAdmin)
