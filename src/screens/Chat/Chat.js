import React, {useEffect, useMemo, useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import SafeScreen from '../../components/SafeScreen';
import {io} from 'socket.io-client';
import {TextInput} from 'react-native-gesture-handler';
import {COLORS} from '../../utils/colors';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState('');

  const baseUrl =
    Platform.OS === 'android'
      ? 'http://192.168.1.100:3000/'
      : 'http://localhost:3000';

  const socket = useMemo(() => io.connect(baseUrl), []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected', socket.id);
    });

    socket.on('receive-message', ({message, roomID}) => {
      console.log('msg', message);
      Alert.alert(message);
      setMessages(prevMessages => [
        ...prevMessages,
        {text: message, id: roomID},
      ]);
    });

    socket.on('welcome', s => {
      console.log(s);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      socket.emit('message', {message, room});
      setMessages(prevMessages => [
        ...prevMessages,
        {text: message, id: socket.id},
      ]);
      setMessage('');
      setRoom('');
    }
  };

  return (
    <SafeScreen>
      <View style={styles.container}>
        <FlatList
          data={messages}
          renderItem={({item}) => (
            <>
              <Image />
              <View
                style={{
                  flexDirection: item.id === socket.id ? 'row' : 'row-reverse',
                }}>
                <Text
                  style={{
                    ...styles.messageContainer,
                    backgroundColor:
                      item.id === socket.id ? '#f1f1f1' : COLORS.green,
                  }}>
                  {item.text}
                </Text>
              </View>
            </>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={message}
            onChangeText={m => setMessage(m)}
            placeholder="Type a message..."
          />
          <Button title="Send" onPress={handleSend} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={room}
            onChangeText={e => setRoom(e)}
            placeholder="Type Room ID"
          />
        </View>
      </View>
    </SafeScreen>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  messageContainer: {
    padding: 10,
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
