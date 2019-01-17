import React from 'react'
import { isNull, isEmpty } from 'lodash'

import { Block, FlexContainer } from '../../UI/Layout'
import {
  Button,
  TextField,
  FormControlLabel,
  Switch,
  DialogContentText,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'

const MAX_SIZE = 2000

const renderCommentSide = (
  disagreement,
  comment,
  onCommentChange,
  onSubmitComment
) => {
  const isTooLong = comment.length > MAX_SIZE

  return isEmpty(disagreement.messages) ? (
    <ExpansionPanel disabled={isNull(disagreement.handler)}>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <DialogContentText>
          Demander un complément d'information
        </DialogContentText>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Block width='100%'>
          <TextField
            multiline
            rowsMax='6'
            style={{ width: '100%' }}
            value={comment}
            onChange={onCommentChange}
          />
          <FlexContainer width='100%' horizontalAlign='between' marginTop='xs'>
            <DialogContentText style={{ color: isTooLong ? 'red' : '' }}>
              {isTooLong
                ? 'Longueur maximal autorisée dépassée'
                : `${MAX_SIZE - comment.length} caractère(s) restant`}
            </DialogContentText>
            <Button
              color='primary'
              variant='contained'
              disabled={isTooLong || comment.length === 0}
              onClick={onSubmitComment}>
              Envoyer
            </Button>
          </FlexContainer>
        </Block>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  ) : (
    <Block width='100%' left marginTop='xs'>
      <DialogContentText style={{ marginBottom: '0.5rem' }}>
        Votre demande de complément d'information :
      </DialogContentText>
      <TextField
        multiline
        rowsMax='6'
        style={{ width: '100%' }}
        value={disagreement.messages[0].content}
        disabled
      />
    </Block>
  )
}

const DisagreementForm = ({
  disagreement,
  mobile,
  onHandling,
  onCommentChange,
  onSubmitComment,
  onSolved,
  comment
}) => (
  <Block
    minWidth={mobile ? 'auto ' : '35rem'}
    paddingHorizontal={mobile ? 'xs' : 'md'}
    paddingVertical='sm'>
    <FlexContainer horizontalAlign='between'>
      <DialogContentText>Gérer le désaccord</DialogContentText>
      <FormControlLabel
        control={
          <Switch
            disabled={disagreement.traited}
            value='handler'
            checked={!isNull(disagreement.handler)}
            onChange={onHandling}
          />
        }
        label={isNull(disagreement.handler) ? 'Non' : 'Oui'}
      />
    </FlexContainer>
    {renderCommentSide(disagreement, comment, onCommentChange, onSubmitComment)}
    <FlexContainer horizontalAlign='between' marginTop='sm'>
      <DialogContentText>Désaccord cloturé</DialogContentText>
      <FormControlLabel
        control={
          <Switch
            disabled={isNull(disagreement.handler)}
            value='solved'
            checked={disagreement.traited}
            onChange={onSolved}
          />
        }
        label={disagreement.traited ? 'Oui' : 'Non'}
      />
    </FlexContainer>
  </Block>
)

export default DisagreementForm
