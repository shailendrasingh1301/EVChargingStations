import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../utils/colors';
import useChatController from './ChatController';
import SafeScreen from '../../components/SafeScreen';

const ChatList = () => {
  const [expandedGroups, setExpandedGroups] = useState({});

  const {
    socket,
    message,
    setMessage,
    messages,
    users,
    room,
    setRoom,
    handleSend,
    roomName,
    setRoomName,
    joinRoomHandler,
    userGroups,
  } = useChatController();

  const renderGroupItem = ({item: groupName}) => (
    <View style={styles.userItem}>
      <TouchableOpacity
        onPress={() => {
          setRoom(groupName);
          toggleGroup(room);
        }}>
        <Text
          style={{
            color: room === groupName ? COLORS.lightGreen : COLORS.black,
          }}>
          {groupName}
        </Text>
      </TouchableOpacity>
      {expandedGroups[room] && (
        <View>
          {userGroups[room].map(userId => (
            <Text key={userId} style={styles.userId}>
              {userId}
            </Text>
          ))}
        </View>
      )}
    </View>
  );

  const toggleGroup = groupName => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  return (
    <SafeScreen>
      <View style={styles.header}>
        <Text style={styles.headerText}>{socket.id}</Text>
      </View>
      <View style={styles.usersContainer}>
        <FlatList
          data={users}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.userItem}
              onPress={() => {
                setRoom(item);
              }}>
              <Text
                style={{
                  color: room === item ? COLORS.lightGreen : COLORS.black,
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
        />
      </View>
      <View style={styles.groupsContainer}>
        <FlatList
          data={Object.keys(userGroups).filter(groupName =>
            userGroups[groupName].includes(socket.id),
          )}
          renderItem={renderGroupItem}
          keyExtractor={item => item}
        />
      </View>
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
          value={roomName}
          onChangeText={m => setRoomName(m)}
          placeholder="Room Name"
        />
        <Button title="Join" onPress={joinRoomHandler} />
      </View>
      <View style={styles.container}>
        <FlatList
          data={messages}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
              }}>
              <View
                style={{
                  ...styles.messageContainer,
                  backgroundColor: COLORS.lightGreen,
                  borderTopLeftRadius: 0,
                }}>
                <Text style={styles.messageText}>{item.message}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeScreen>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  usersContainer: {
    marginBottom: 20,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
