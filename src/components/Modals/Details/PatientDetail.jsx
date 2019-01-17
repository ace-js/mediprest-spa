import React from 'react'
import { Avatar, colors } from '@material-ui/core'
import { Block, FlexContainer } from './../../UI/Layout'
import { H2, Text } from '../../UI/Text'

const PatientDetail = ({ patient, fullScreen, styles }) => (
  <FlexContainer
    direction='column'
    verticalAlign='middle'
    padding='sm'
    heigh='100%'
    className='Patient'
    bgColorMUI={colors.blue[300]}
  >
    <H2 color='White' align='center'>
      Informations sur le patient
    </H2>
    <Avatar
      style={fullScreen ? styles.avatar.small : styles.avatar.big}
      src={patient.photoUrl}
      alt='Photo du patient'
    />
    <FlexContainer
      marginVertical='sm'
      marginHorizontal={fullScreen ? 'md' : 'zero'}
      padding='xs'
      horizontalAlign='around'
      border='2px solid'
      borderColor='White'
      radius='5px'
    >
      <Block>
        <Text weight='bold' color='White'>Nom: </Text>
        <Text weight='bold' color='White'>Prénom: </Text>
        <Text weight='bold' color='White'>Date de naissance: </Text>
        <Text weight='bold' color='White'>Sexe: </Text>
      </Block>
      <Block>
        <Text weight='bold' color='White'>{patient.name}</Text>
        <Text weight='bold' color='White'>{patient.firstname}</Text>
        <Text weight='bold' color='White'>
          {new Date(patient.birthdate).toLocaleDateString('fr-BE')}
        </Text>
        <Text weight='bold' color='White'>
          {' '}{patient.sexe === 'M' ? 'Masculin' : 'Feminin'}{' '}
        </Text>
      </Block>
    </FlexContainer>
  </FlexContainer>
)

export default PatientDetail
