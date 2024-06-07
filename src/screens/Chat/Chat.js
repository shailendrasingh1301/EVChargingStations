import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import SafeScreen from '../../components/SafeScreen';
import {COLORS} from '../../utils/colors';
import {useRoute} from '@react-navigation/native';
import {Images} from '../../assets/Images';
import {navigationRef} from '../../navigators/helper';

const Chat = () => {
  const route = useRoute();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const {room, userRoomID, socket} = route.params;

  useEffect(() => {
    socket.on('receive-message', ({message, from}) => {
      setMessages(prevMessages => [...prevMessages, {text: message, id: from}]);
    });
  }, [socket]);

  const handleSend = () => {
    if (message.trim()) {
      socket.emit('message', {message, to: room});
      setMessages(prevMessages => [...prevMessages, {text: message, id: room}]);
      setMessage('');
    }
  };
  return (
    <SafeScreen>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigationRef.goBack()}>
          <Image source={Images.BackButton} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{room}</Text>
      </View>

      <View style={styles.container}>
        <FlatList
          data={messages}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: item.id === userRoomID ? 'row' : 'row-reverse',
                marginBottom: 10,
              }}>
              <View
                style={{
                  ...styles.messageContainer,
                  backgroundColor:
                    item.id === userRoomID
                      ? COLORS.whiteShade
                      : COLORS.lightGreen,
                  borderTopRightRadius: item.id !== userRoomID ? 0 : 15,
                  borderTopLeftRadius: item.id === userRoomID ? 0 : 15,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: COLORS.lightGreen,
    paddingHorizontal: 20,
  },
  headerText: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
    color: COLORS.black,
    fontSize: 16,
  },
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
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 20,
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
  groupsContainer: {
    marginBottom: 20,
  },
  group: {
    marginBottom: 10,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userIdsContainer: {
    paddingLeft: 20,
    marginTop: 5,
  },
  userId: {
    fontSize: 16,
  },
});
