import React from 'react'
import { DialogContentText, TextField } from '@material-ui/core'

import { FlexContainer, Block } from './../../UI/Layout'

const DisagreementDetail = ({ disagreement, mobile }) => (
  <Block
    minWidth={mobile ? 'auto ' : '35rem'}
    paddingHorizontal={mobile ? 'xs' : 'md'}
    paddingVertical='sm'>
    <FlexContainer horizontalAlign='between' marginBottom='sm'>
      <DialogContentText>Créateur :</DialogContentText>
      <DialogContentText>
        {disagreement.creator.firstname} {disagreement.creator.name}
      </DialogContentText>
    </FlexContainer>
    <FlexContainer horizontalAlign='between' marginBottom='sm'>
      <DialogContentText>Géré par :</DialogContentText>
      <DialogContentText>
        {disagreement.handler
          ? `${disagreement.handler.firstname} ${disagreement.handler.name}`
          : '---'}
      </DialogContentText>
    </FlexContainer>
    <FlexContainer horizontalAlign={mobile ? 'left' : 'between'} direction={mobile ? 'column' : 'row'}>
      <DialogContentText>{'Raison   :'}</DialogContentText>
      <TextField
        variant='outlined'
        multiline
        rowsMax='6'
        style={{ width: mobile ? '100%' :'75%'}}
        value={disagreement.comment}
        disabled
      />
    </FlexContainer>
    <FlexContainer horizontalAlign='between' marginTop='sm'>
      <DialogContentText>Status :</DialogContentText>
      <DialogContentText>
        {disagreement.traited ? 'Traité' : disagreement.handler ? 'En cours de résolution' : 'Non traité'}
      </DialogContentText>
    </FlexContainer>
  </Block>
)

export default DisagreementDetail
