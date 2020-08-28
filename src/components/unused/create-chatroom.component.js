import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

// Fix this file later on, when you actually need to connect to backend
function CreateChatroomComponent() {

  const [roomname, setRoomname] = useState('default roomname');
  const [description, setDescription] = useState('default description');

  // get data from backend?
  useEffect(() => {

  }, []);


  // Verify fields and send request to backend
  const submitHandler = () => {

    const chatroom = {

    };

  }


  // onSubmit(e){
  //   e.preventDefault();
  //   const chatroom = {
  //     roomname: this.state.roomname,
  //     description: this.state.description
  //   }
  //   console.log(chatroom)
  //   window.location = '/';
  // }

    return (

      <div> CreateChatroom </div>
    );
}

export default CreateChatroomComponent;
