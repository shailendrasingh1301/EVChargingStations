import React, {useEffect, useMemo, useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import SafeScreen from '../../components/SafeScreen';
import {io} from 'socket.io-client';
import {TextInput} from 'react-native-gesture-handler';
import {COLORS} from '../../utils/colors';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userRoomID, setUserRoomId] = useState('');

  const baseUrl =
    Platform.OS === 'android'
      ? 'http://192.168.1.7:3000/'
      : 'http://localhost:3000';

  const socket = useMemo(() => io.connect(baseUrl), [baseUrl]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected', socket.id);
      setUserRoomId(socket.id);
    });

    socket.on('receive-message', ({message, from}) => {
      console.log('msg', message);
      setMessages(prevMessages => [...prevMessages, {text: message, id: from}]);
    });

    socket.on('users-list', users => {
      setUsers(users.filter(user => user !== socket.id));
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleSend = () => {
    if (message.trim()) {
      socket.emit('message', {message, to: selectedUser});
      setMessages(prevMessages => [
        ...prevMessages,
        {text: message, id: socket.id},
      ]);
      setMessage('');
    }
  };

  return (
    <SafeScreen>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.lightGreen,
        }}>
        <Text
          style={{
            paddingVertical: 20,
            paddingHorizontal: 8,
            textAlign: 'center',
            color: COLORS.black,
            fontSize: 16,
          }}>
          {userRoomID}
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.usersContainer}>
          <FlatList
            data={users}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.userItem}
                onPress={() => setSelectedUser(item)}>
                <Text
                  style={{
                    color:
                      selectedUser === item ? COLORS.lightGreen : COLORS.black,
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item}
          />
        </View>
        <FlatList
          data={messages}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: item.id === socket.id ? 'row' : 'row-reverse',
                marginBottom: 10,
              }}>
              <View
                style={{
                  ...styles.messageContainer,
                  backgroundColor:
                    item.id === socket.id
                      ? COLORS.whiteShade
                      : COLORS.lightGreen,
                  borderTopRightRadius: item.id !== socket.id ? 0 : 15,
                  borderTopLeftRadius: item.id === socket.id ? 0 : 15,
                }}>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            </View>
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
  usersContainer: {
    marginBottom: 20,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  messageContainer: {
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
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
