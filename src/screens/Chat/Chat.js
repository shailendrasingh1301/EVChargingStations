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

  const {room, socket, userGroups} = route.params;
  // console.log('Room:', room, 'Socket ID:', socket.id);

  useEffect(() => {
    socket.on('receive-message', data => {
      console.log('Message:', data);
      setMessages(prevMessages => [...prevMessages, data]);
    });

    return () => {
      socket.off('receive-message');
    };
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      socket.emit('message', {message, room});
      // setMessages(prevMessages => [
      //   ...prevMessages,
      //   {message: message, room: socket.id},
      // ]);
      setMessage('');
    }
  };

  const [expandedGroups, setExpandedGroups] = useState({});

  const toggleGroup = groupName => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  return (
    <SafeScreen>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigationRef.goBack()}>
          <Image source={Images.BackButton} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleGroup(room)}>
          <Text style={styles.headerText}>{room}</Text>
        </TouchableOpacity>
        {expandedGroups[room] && (
          <View style={styles.userIdsContainer}>
            {userGroups[room].map(userId => (
              <Text key={userId} style={styles.userId}>
                {userId}
              </Text>
            ))}
          </View>
        )}
      </View>

      <View style={styles.container}>
        <FlatList
          data={messages}
          renderItem={({item}) => (
            <View
              style={{
                // flexDirection: item.room === room ? 'row' : 'row-reverse',
                flexDirection: 'row',
                marginBottom: 10,
              }}>
              <View
                style={{
                  ...styles.messageContainer,
                  backgroundColor: COLORS.lightGreen,
                  // item.room !== socket.id
                  //   ? COLORS.lightGreen
                  //   : COLORS.whiteShade,
                  // borderTopRightRadius: item.room === socket.id ? 0 : 15,
                  borderTopLeftRadius: 15,
                }}>
                <Text style={styles.messageText}>{item.message}</Text>
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
});
