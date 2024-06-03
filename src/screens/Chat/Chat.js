import React, {useEffect, useMemo, useState} from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList} from 'react-native';
import SafeScreen from '../../components/SafeScreen';
import {io} from 'socket.io-client';
import {TextInput} from 'react-native-gesture-handler';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const baseUrl =
    Platform.OS === 'android'
      ? 'http://192.168.1.100:3000/'
      : 'http://localhost:3000';

  const socket = useMemo(() => io.connect(baseUrl), []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected', socket.id);
    });

    socket.on('welcome', s => {
      console.log(s);
    });

    socket.on('message', msg => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      socket.emit('message', message);
      setMessages(prevMessages => [
        ...prevMessages,
        {text: message, id: socket.id},
      ]);
      setMessage('');
    }
  };

  return (
    <SafeScreen>
      <View style={styles.container}>
        <FlatList
          data={messages}
          renderItem={({item}) => (
            <View style={styles.messageContainer}>
              <Text>{item.text}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
          />
          <Button title="Send" onPress={handleSend} />
        </View>
      </View>
    </SafeScreen>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});
