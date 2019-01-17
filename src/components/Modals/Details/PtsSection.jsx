import React from 'react'
import PropTypes from 'prop-types'

import { Grid, Block } from './../../UI/Layout'
import { H2 } from '../../UI/Text'
import DetailElement from './DetailElement'

const PtsSection = ({ title, pts, details, mobile }) => (
  <Block paddingVertical='xs'>
    <Block paddingHorizontal='xs'>
      <H2 align='center'>{title}</H2>
    </Block>
    <Grid
      templateRMobile='1fr 1fr'
      templateAMobile={`".A .A" ".B .B" `}
      templateCDesktop='1fr 1fr'
      templateADesktop={`".A .B"`}
    >
      <Block
        className='A'
        padding='xs'
        border='1px solid'
        borderColor='GreyWhite'
      >
        {details.sideA.map((item, index) => (
          <DetailElement
            key={`detail_a_${index}`}
            pts={pts}
            element={item}
            mobile={mobile}
          />
        ))}
      </Block>
      <Block
        className='B'
        padding='xs'
        border='1px solid'
        borderColor='GreyWhite'
      >
        {details.sideB.map((item, index) => (
          <DetailElement
            key={`detail_a_${index}`}
            pts={pts}
            element={item}
            mobile={mobile}
          />
        ))}
      </Block>
    </Grid>
  </Block>
)

PtsSection.propTypes = {
  title: PropTypes.string,
  pts: PropTypes.object,
  details: PropTypes.object,
  mobile: PropTypes.bool
}

export default PtsSection
