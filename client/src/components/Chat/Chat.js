import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import axios from 'axios';
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

const ENDPOINT = 'https://project-chat-application.herokuapp.com/';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  var [messages, setMessages] = useState([]);
  const [post, setpost] = useState([]);
  


  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });


 

  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  




  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
     var test = fetchMovies()
      
   
    
      // socket.emit('sendMessage', message, () => setMessage(''));
    }

    async function fetchMovies() {


      var bodyFormData = new FormData();
      bodyFormData.append('receivex', 'How to report a problem with an article');
      axios({
        method: "post",
        timeout: 200000,
        url: "https://kproapps.pythonanywhere.com",
        data: bodyFormData,
        headers: { 'Accept': '/', 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'},
      })
      .then((response) => {
        messages = response.data
        setMessages(messages);
        console.log(response);
      });
  //   try {
  //     const fetchResponse = await fetch('https://kproapps.pythonanywhere.com', {
  //       method: 'POST',
  //       headers: { 'Accept': '/', 
  //       'Content-Type': 'multipart/form-data',
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
  //       'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'},
  //       body: JSON.stringify({ receive: 'How to report a problem with an article' })
	// });
  //     const data = await fetchResponse.json();
  //     return data;
  // } catch (e) {
  //     return e;
  // } 
    }

  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;
