import React, { Fragment } from 'react'
import { isNull, noop } from 'lodash'
import { Checkbox, TableCell, TableRow } from '@material-ui/core'
import {
  SearchRounded,
  AddCircleRounded,
  AnnouncementRounded,
  WarningRounded
} from '@material-ui/icons'

import FlexContainer from './../../UI/Layout/FlexContainer'
import Link from './../../UI/Text/Link'
import { colors as basedColors, utility } from './../../../shared'
import constants from './../../../shared/constants'

const generateIcons = (contextType, pts, onOpenModal) => {
  switch (contextType) {
    case constants.CONTEXT.VALIDATION:
      return (
        <Fragment>
          <Link
            title='Add a prestation'
            onClick={() =>
              onOpenModal(constants.MODAL_CONTEXT.ADD_PTS, pts._id)
            }>
            <AddCircleRounded style={{ color: colors.GreenSeafoam }} />
          </Link>
          <Link
            title={'Voir le détail de la prestation'}
            onClick={() =>
              onOpenModal(constants.MODAL_CONTEXT.DETAIL, pts._id)
            }>
            <SearchRounded style={{ color: colors.BlueSky }} />
          </Link>
          {isNull(pts.disagreement) && (
            <Link
              title={'Ajouter un désaccord'}
              onClick={() =>
                onOpenModal(constants.MODAL_CONTEXT.DISAGREEMENT, pts._id)
              }>
              <AnnouncementRounded style={{ color: colors.Tomato }} />
            </Link>
          )}
        </Fragment>
      )
    case constants.CONTEXT.FACTURATION:
      return (
        <Fragment>
          <Link
            title={'Voir le détail de la prestation'}
            onClick={() =>
              onOpenModal(constants.MODAL_CONTEXT.DETAIL, pts._id)
            }>
            <SearchRounded style={{ color: colors.BlueSky }} />
          </Link>
          {!isNull(pts.disagreement) && (
            <Link
              title={'Gestion du désaccord'}
              onClick={() =>
                onOpenModal(constants.MODAL_CONTEXT.DISAGREEMENT, pts._id)
              }>
              <WarningRounded
                style={{
                  color: pts.disagreement.traited
                    ? colors.GreenSeafoam
                    : colors.Orange
                }}
              />
            </Link>
          )}
        </Fragment>
      )
    case constants.CONTEXT.HISTORIC:
      return (
        <Link
          title={'Voir le détail de la prestation'}
          onClick={() => onOpenModal(pts._id)}>
          <SearchRounded style={{ color: colors.BlueSky }} />
        </Link>
      )
  }
}

const renderCheckbox = (contextType, onCheck, pts) => {
  switch (contextType) {
    case constants.CONTEXT.VALIDATION:
      return (
        <TableCell>
          <Checkbox
            onChange={(e) => onCheck(e, pts._id)}
            checked={pts.isValidated}
          />
        </TableCell>
      )
    case constants.CONTEXT.FACTURATION:
      return (
        <TableCell>
          <Checkbox
            onChange={(e) => onCheck(e, pts._id)}
            checked={pts.isInvoiced}
            disabled={pts.disagreement ? !pts.disagreement.traited : false}
          />
        </TableCell>
      )
    default:
      return null
  }
}
// TO DO : make a function which render link and checkbox base on context
const { list: colors } = basedColors

const PtsRow = ({ pts, onValidate, onOpenModal, contextType, cssClass }) => (
  <TableRow
    hover
    key={pts._id}
    className={cssClass}
    style={utility.getRowBg(pts, contextType)}>
    {renderCheckbox(contextType, onValidate, pts)}
    <TableCell>{pts.typeContact}</TableCell>
    <TableCell>{pts.contact}</TableCell>
    <TableCell>
      {new Date(pts.prestationDate).toLocaleDateString('fr-BE')}
    </TableCell>
    <TableCell>{pts.prestation._id}</TableCell>
    <TableCell>{`${pts.patient.firstname} ${pts.patient.name}`}</TableCell>
    <TableCell>
      <FlexContainer verticalAlign={'bottom'}>
        {generateIcons(contextType, pts, onOpenModal)}
      </FlexContainer>
    </TableCell>
  </TableRow>
)

PtsRow.defaultProps = {
  onValidate: noop
}
export default PtsRow
