import React from 'react'

import { FlexContainer, Block } from './../../../components/UI/Layout'
import { Text } from './../../../components/UI/Text'
import ItemWrapper from './ItemWrapper'

const MessageItem = ({ unread , active, onSelect, label, id}) => {
  const title = `Contact: ${id}`
  return (
    <ItemWrapper title={title} className={active ? 'active' : ''} onClick={() => !active && onSelect(id)}>
      <Text color='BlueMoon' weight='bold' lineHeight='0'>{title.substring(0,20)}..</Text>
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
        <Text color='GreyWarm'>{label.substring(0,20)}</Text>
      </FlexContainer>
    </ItemWrapper>
  )
}

MessageItem.defaultProps = {
  id: '',
  label: ''
}
export default MessageItem
