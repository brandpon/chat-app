import React, {useState, useEffect} from 'react';
import {socket} from '../utils/socket.io';
import ScrollToBottom from 'react-scroll-to-bottom';
import './css/chat.css';

function MessageListComponent(){
  const [message, setMessage] = useState([]);
  const [messageList, setMessageList] = useState([]);

  // {'username':'user1','message':'hello', 'uuid': 123}

  // load messages when joining chatroom

  // useEffect(() => {
  //   async function loadData (){

  //   }
  //   loadData();
  // }, [])

  useEffect(() => {
    socket.on('message', (data) => {
      setMessage([data]);
      console.log(data);
    });
  }, []);

  // Update state every time client receives a message
  useEffect(() => {
    setMessageList(message.map(message =>
     [...messageList, <div className='message-div' key={message}>{message.username}: {message.message}</div>]
   ));
 }, [JSON.stringify(message)]);

  return (
    <ScrollToBottom className='chatbox text-white'>
      <div>{messageList}</div>
    </ScrollToBottom>
  );
}

export default MessageListComponent;
