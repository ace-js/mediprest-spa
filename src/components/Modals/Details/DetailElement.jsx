import React from 'react'
import PropTypes from 'prop-types'
import { get, isNull } from 'lodash'
import { FormControlLabel, Switch, TextField } from '@material-ui/core'
import { Block, FlexContainer } from './../../UI/Layout'
import { Text } from '../../UI/Text'

const renderValue = (value, type, mobile, multi, subValues) => {
  switch (type) {
    case 'text':
      return (
        <Block
          right
          width={mobile ? '100%' : '70%'}
          border='1px solid'
          paddingHorizontal='xs'
          borderColor='GreyWarm'
          radius='5px'
        >
          <Text color='GreyWarm'>
            {multi
              ? value
                ? subValues.map(item => `${get(value, item, '')} `)
                : '---'
              : value}
          </Text>
        </Block>
      )
    case 'bool':
      value = typeof value !== 'boolean' ? !isNull(value) : value

      return (
        <FormControlLabel
          control={
            <Switch
              disabled
              checked={value}
              color='primary'
              value='radioValue'
            />
          }
          label={value ? 'Oui' : 'Non'}
        />
      )
    case 'date':
      return (
        <Block
          right
          width={mobile ? '100%' : '70%'}
          border='1px solid'
          paddingHorizontal='xs'
          borderColor='GreyWarm'
          radius='5px'
        >
          <Text color='GreyWarm'>
            {new Date(value).toLocaleDateString('fr-BE')}
          </Text>
        </Block>
      )
    case 'area':
      return (
        <TextField
          variant='outlined'
          disabled
          value={value || ''}
          multiline
          rowsMax='4'
          style={{ width: '100%', marginLeft: mobile ? '0' : ' 10px' }}
        />
      )
  }
}

const DetailElement = ({ pts, element, mobile }) => (
  <FlexContainer
    direction={mobile ? 'column' : 'row'}
    horizontalAlign='between'
    verticalAlign='top'
    marginVertical='xs'
  >
    <Block>
      <Text lineHeight='1.2rem'>{element.label}</Text>
    </Block>
    {renderValue(
      get(pts, element.value, null),
      element.type,
      mobile,
      element.multi,
      element.subValues
    )}
  </FlexContainer>
)

DetailElement.propTypes = {}

export default DetailElement
