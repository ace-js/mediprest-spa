import React from 'react'

import { Block } from './../../UI/Layout'
import PtsSection from './PtsSection'
import { adminDetail, prestationDetail } from './constants'

const PtsDetail = ({ pts, mobile }) => (
  <Block className='Pts'>
    <PtsSection
      title='Informations sur la prestation'
      pts={pts}
      details={prestationDetail}
      mobile={mobile}
    />
    <PtsSection
      title='Informations administrative'
      pts={pts}
      details={adminDetail}
      mobile={mobile}
    />
  </Block>
)

export default PtsDetail
