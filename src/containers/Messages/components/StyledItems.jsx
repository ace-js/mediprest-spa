import styled from 'styled-components'

export const ChatWrapper = styled.div.attrs({
  className: 'ChatWrapper'
})`
  width: auto;
  height: 600px;
`

export const ChatHeader = styled.div.attrs({
  className: 'ChatHeader'
})`
  background: #4696ec;
  width: 100%;
  padding: 10px;
  border-radius: 5px 5px 0 0;
  max-width: 100%;
  box-sizing: border-box;
  height: 100px;
`
export const ChatTitle = styled.h2.attrs({
  className: 'ChatTitle'
})`
  color: white;
  text-align: center;
  padding: 0;
  line-height: 1;
`

export const ChatFooter = styled.div.attrs({
  className: 'ChatFooter'
})`
  background: #4696ec;
  width: 100%;
  padding: 20px;
  border-radius: 0 0 5px 5px;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  height: 100px;
`

export const ChatContent = styled.div.attrs({
  className: 'ChatContent'
})`
  height: 400px;
  width: 100%;
  padding: 20px;
  background-color: #efefef;
  border-radius: 5px;
  max-width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
`
export const Speech = styled.div.attrs({
  className: 'Speech'
})`
  margin: 15px 0;
  flex: 1 0 auto;
  max-width: 40%;
  position: relative;
  font-family: arial;
  font-size: 1.1em;
  background: #306aa5;
  color: #fff;
  border-radius: 10px;
  padding: 10px;
  max-width: 400px;
  text-align: left;
  &.left {
    background: rgb(255, 255, 255);
    color: #666;
    &::after {
      content: '';
      border: 10px solid transparent;
      border-right-color: rgb(255, 255, 255);
      border-left: 0;
      position: absolute;
      left: -10px;
      top: 50%;
      margin-top: -10px;
    }
  }
  &.right {
    margin-left: auto;
    background: #3a86f6;
    align-self: flex-end;
    &::after {
      content: '';
      border: 10px solid transparent;
      border-left-color: #3a86f6;
      border-right: 0;
      position: absolute;
      right: -10px;
      top: 50%;
      margin-top: -10px;
    }
  }
`
export const LastSpeechStatus = styled.div`
  font-size: 14px;
  margin: 0 0 5px;
  flex: 1 0 auto;
  max-width: 40%;
  position: relative;
  font-family: arial;
  color: rgb(160, 160, 160);
  border-radius: 10px;
  padding: 0;
  max-width: 400px;
  text-align: right;
  margin-left: auto;
  align-self: flex-end;
  top: -5px;
  &.read {
    color: rgb(0, 134, 52);
  }
`

export const ChatArea = styled.textarea`
 border-radius: 3px;
 border: none;
 box-sizing: border-box;
 flex: 1 0 auto;
 font-size: 16px;
 margin-right: 20px;
 max-width: 100%;
 height: 60px;
 padding: 5px;
 resize: none;
`

export const ChatButton = styled.button`
 height: 60px;
 color: white;
 border-radius: 3px;
 max-width: 100%;
 box-sizing: border-box;
`
