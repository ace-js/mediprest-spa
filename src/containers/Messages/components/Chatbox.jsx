import React from 'react'
import { isEmpty } from 'lodash'
import uuid from 'uuid'

import { Block } from '../../../components/UI/Layout'

const ChatBox = ({ collabId, messages }) => {
  return (
    <Block>
      {!isEmpty(messages) ? (
        messages.map((item) => <p key={uuid.v1()}>{item.content}</p>)
      ) : (
        <p>Veuillez selectionner une conversation</p>
      )}
    </Block>
  )
}

ChatBox.defaultProps = {
  messages: []
}

export default ChatBox


// <div class="chat__wrapper">
//       <div class="chat__header">
//         <h2 class="chat__title">Contact: 111111</h2>
//       </div>
//       <div class="chat__content">
//         <div
//           class="speech left"
//         >Left Tail Lorr sit amet consectetur, adipisicing elit. Ex tempore, dolor fugiat a sequi ducimus nemo voluptas totam vitae eius nostrum quasi illum numquam quis excepturi delectus nulla, dignissimos magnam.</div>
//         <div class="speech right">Right Tail Lorem ipsum dolor sit a</div>
//         <div class="speech right">Right Tail Lorem ipsum dolor sit a</div>
//         <div class="speech right">Right Tail Lorem ipsum dolor sit a</div>
//         <div class="speech right">Right Tail Lorem ipsum dolor sit a</div>
//         <div
//           class="speech left"
//         >Left Tail Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex tempore, dolor fugiat a sequi ducimus nemo voluptas totam vitae eius nostrum quagnissimos magnam.</div>
//         <div
//           class="speech right"
//         >Right Tail Lorem ipsumft Tail Lorem ipsum dolor sit amet consectetur, aft Tail Lorem ipsum dolor sit amet consectetur, aft Tail Lorem ipsum dolor sit amet consectetur, aft Tail Lorem ipsum dolor sit amet consectetur, aft Tail Lorem ipsum dolor sit amet consectetur, a dolor sit a</div>
//         <div
//           class="speech right"
//         >Right Tail Lorem ipsumft Tail Lorem ipsum dolor sit amet consectetur, aft Tail Lorem ipsum dolor sit amet consectetur, aft Tail Lorem ipsum dolor sit amet consectetur, aft Tail Lorem ipsum dolor sit amet consectetur, aft Tail Lorem ipsum dolor sit amet consectetur, a dolor sit a</div>
//         <div class="speech left">Left Tail Lorem ipsum a, dignissimos magnam.</div>
//         <div class="speech right">Right Tail Lorem ipsum dolor sit a</div>
//         <div
//           class="speech left"
//         >Left Tail Lorr sit amet consectetur, adipisicing elit. Ex tempore, dolor fugiat a sequi ducimus nemo voluptas totam vitae eius nostrum quasi illum numquam quis excepturi delectus nulla, dignissimos magnam.</div>
//         <div
//           class="speech left"
//         >Left Tail Lorr sit amet consectetur, adipisicing elit. Ex tempore, dolor fugiat a sequi ducimus nemo voluptas totam vitae eius nostrum quasi illum numquam quis excepturi delectus nulla, dignissimos magnam.</div>
//         <div class="speech right">Right Tail Lorem ipsum dolor sit a</div>
//         <div
//           class="speech left"
//         >Left Tail Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex tempore, dolor fugiat a sequi ducimus nemo voluptas totam vitae eius nostrum quagnissimos magnam.</div>
//         <div
//           class="speech right"
//         >Right Tail Lorem ipsumft Tail Lorem ipsum dolor sit amet consectetur, aft Tail Lorem ipsum dolor sit amet consectetur, aft Tail Lorem ipsum dolor sit amet consectetur, aft Tail Lorem ipsum dolor sit amet consectetur, aft Tail Lorem ipsum dolor sit amet consectetur, a dolor sit a</div>
//         <div class="speech left">Left Tail Lorem ipsum a, dignissimos magnam.</div>
//         <div class="speech right">Right Tail Lorem ipsum dolor sit a</div>
//         <div class="last__speech">... non lu</div>
//         <div class="last__speech read">non lu</div>
//       </div>
//       <div class="chat__footer">
//         <textarea class="chat__message"></textarea>
//         <button class="chat__action">
//           <span>send slqudhjsqu hjdqd</span>
//         </button>
//       </div>
//     </div>

//     <style>
// .chat__wrapper {
//   width: 600px;
//   margin: 50px auto;
// }

// .chat__header {
//   background: #306aa5;
//   width: 100%;
//   padding: 10px;
//   border-radius: 5px 5px 0 0;
//   max-width: 100%;
//   box-sizing: border-box;
// }

// .chat__title {
//   color: white;
//   text-align: center;
//   padding: 0;
//   line-height: 1;
// }

// .chat__footer {
//   background: #306aa5;
//   width: 100%;
//   padding: 20px;
//   border-radius: 0 0 5px 5px;
//   max-width: 100%;
//   box-sizing: border-box;
//   display: flex;
//   justify-content: space-between;
//   flex-wrap: nowrap;
//   flex-direction: row;
//   align-items: center;
// }

// .chat__content {
//   max-height: 400px;
//   width: 100%;
//   padding: 20px;
//   background-color: #efefef;
//   border-radius: 5px;
//   max-width: 100%;
//   overflow-y: auto;
//   box-sizing: border-box;
// }
// .speech {
//   margin: 15px 0;
//   flex: 1 0 auto;
//   max-width: 40%;
//   position: relative;
//   font-family: arial;
//   font-size: 1.1em;
//   background: #306aa5;
//   color: #fff;
//   border-radius: 10px;
//   padding: 10px;
//   max-width: 400px;
//   text-align: left;
// }
// .last__speech {
//   font-size: 14px;
//   margin: 0 0 5px;
//   flex: 1 0 auto;
//   max-width: 40%;
//   position: relative;
//   font-family: arial;
//   color: rgb(160, 160, 160);
//   border-radius: 10px;
//   padding: 0;
//   max-width: 400px;
//   text-align: right;
//   margin-left: auto;
//   align-self: flex-end;
//   top: -5px;
// }
// .read {
//   color: rgb(0, 134, 52);
// }

// .right {
//   margin-left: auto;
//   background: #3a86f6;
//   align-self: flex-end;
// }

// .left {
//   background: rgb(255, 255, 255);
//   color: #666;
// }

// .bottom:after {
//   /* [THESE WILL CREATE THE TRIANGLE] */
//   content: "";
//   border: 10px solid transparent;
//   border-top-color: #306aa5;
//   border-bottom: 0;
//   /* [THESE WILL POSITION THE TRIANGLE] */
//   position: absolute;
//   bottom: -10px;
//   left: 50%;
//   margin-left: -10px;
// }

// .top:after {
//   content: "";
//   border: 10px solid transparent;
//   border-bottom-color: #306aa5;
//   border-top: 0;
//   position: absolute;
//   top: -10px;
//   left: 50%;
//   margin-left: -10px;
// }

// .left:after {
//   content: "";
//   border: 10px solid transparent;
//   border-right-color: rgb(255, 255, 255);
//   border-left: 0;
//   position: absolute;
//   left: -10px;
//   top: 50%;
//   margin-top: -10px;
// }

// .right:after {
//   content: "";
//   border: 10px solid transparent;
//   border-left-color: #3a86f6;
//   border-right: 0;
//   position: absolute;
//   right: -10px;
//   top: 50%;
//   margin-top: -10px;
// }

// .chat__message {
//   border-radius: 3px;
//   border: none;
//   box-sizing: border-box;
//   flex: 1 0 auto;
//   font-size: 16px;
//   margin-right: 20px;
//   max-width: 100%;
//   height: 60px;
//   padding: 5px;
//   resize: none;
// }

// .chat__action {
//   height: 60px;
//   color: white;
//   border-radius: 3px;
//   max-width: 100%;
//   box-sizing: border-box;
// }

