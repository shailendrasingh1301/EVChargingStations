import {Platform} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {io} from 'socket.io-client';

const useChatController = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [socketID, setSocketId] = useState('');
  const [users, setUsers] = useState([]);
  const [userGroups, setUserGroups] = useState({});
  const [room, setRoom] = useState(null);

  const baseUrl =
    Platform.OS === 'android'
      ? 'http://192.168.1.100:3000/'
      : 'http://localhost:3000';

  const socket = useMemo(() => io.connect(baseUrl), [baseUrl]);

  useEffect(() => {
    socket.on('connect', () => {
      setSocketId(socket.id);
      console.log('connected', socket.id);
    });

    socket.on('receive-message', data => {
      console.log('msg', data);
      setMessages(prevMessages => [...prevMessages, data]);
    });

    socket.on('users-list', ({connectedUsers, userGroups}) => {
      setUsers(connectedUsers.filter(user => user !== socket.id));
      setUserGroups(userGroups);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleSend = () => {
    if (message.trim()) {
      socket.emit('message', {message, room});
      setMessage('');
    }
  };
  const joinRoomHandler = () => {
    socket.emit('join-room', roomName);
    setRoomName('');
  };
  return {
    socket,
    message,
    setMessage,
    messages,
    setMessages,
    users,
    setUsers,
    room,
    setRoom,
    socketID,
    setSocketId,
    handleSend,
    roomName,
    setRoomName,
    joinRoomHandler,
    userGroups,
  };
};

export default useChatController;
