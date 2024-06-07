import {Platform} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {io} from 'socket.io-client';

const useChatController = () => {
  // const [message, setMessage] = useState('');
  // const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userRoomID, setUserRoomId] = useState('');
  const [roomName, setRoomName] = useState('');
  const [userGroups, setUserGroups] = useState({});

  const baseUrl =
    Platform.OS === 'android'
      ? 'http://192.168.1.100:3000/'
      : 'http://localhost:3000';

  const socket = useMemo(() => io.connect(baseUrl), [baseUrl]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected', socket.id);
      setUserRoomId(socket.id);
    });

    // socket.on('receive-message', ({message, from}) => {
    //   console.log('msg', message);
    //   setMessages(prevMessages => [...prevMessages, {text: message, id: from}]);
    // });

    socket.on('users-list', ({connectedUsers, userGroups}) => {
      setUsers(connectedUsers.filter(user => user !== socket.id));
      setUserGroups(userGroups);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  // const handleSend = () => {
  //   if (message.trim()) {
  //     socket.emit('message', {message, to: selectedUser});
  //     setMessages(prevMessages => [
  //       ...prevMessages,
  //       {text: message, id: socket.id},
  //     ]);
  //     setMessage('');
  //   }
  // };
  const joinRoomHandler = () => {
    socket.emit('join-room', roomName);
    setRoomName('');
  };
  return {
    socket,
    // message,
    // setMessage,
    // messages,
    // setMessages,
    users,
    setUsers,
    selectedUser,
    setSelectedUser,
    userRoomID,
    setUserRoomId,
    // handleSend,
    roomName,
    setRoomName,
    joinRoomHandler,
    userGroups,
  };
};

export default useChatController;
