import React from 'react'

import { FlexContainer, Block } from './../../../components/UI/Layout'
import { Text } from './../../../components/UI/Text'
import ItemWrapper from './ItemWrapper'

const MessageItem = ({ unread , active, onSelect}) => {
  return (
    <ItemWrapper className={active ? 'active' : ''} onClick={() => !active && onSelect(123)}>
      <Text color='BlueMoon' weight='bold' lineHeight='0'>Contact : 98989</Text>
      <FlexContainer
        paddingHorizontal='xs'
        width='100%'
        verticalAlign='middle'
        paddingBottom='xs'>
        <Block
          width='20px'
          height='20px'
          radius='15px'
          bgColor={unread ? 'BlueHeaven' : 'Transparent'}
          marginRight='xs'
        />
        <Text color='GreyWarm'>blablablablaa</Text>
      </FlexContainer>
    </ItemWrapper>
  )
}

export default MessageItem
