import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../utils/colors';
import useChatController from './ChatController';
import SafeScreen from '../../components/SafeScreen';
import RootNavigation from '../../navigators/helper';
import {ROUTES} from '../../utils/routes';

const ChatList = ({navigation}) => {
  const {
    socket,
    message,
    setMessage,
    messages,
    setMessages,
    users,
    setUsers,
    selectedUser,
    setSelectedUser,
    userRoomID,
    setUserRoomId,
    handleSend,
    roomName,
    setRoomName,
    joinRoomHandler,
    allRooms,
    userGroups,
  } = useChatController();

  const [expandedGroups, setExpandedGroups] = useState({});

  const toggleGroup = groupName => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  const renderGroupItem = ({item: groupName}) => (
    <View style={styles.userItem}>
      <TouchableOpacity
        onPress={() => {
          toggleGroup(groupName);
          setSelectedUser(groupName);
          RootNavigation.navigate(ROUTES.CHAT, {
            room: groupName,
            userRoomID: userRoomID,
            socket: socket,
          });
        }}>
        <Text
          style={{
            color:
              selectedUser === groupName ? COLORS.lightGreen : COLORS.black,
          }}>
          {groupName}
        </Text>
      </TouchableOpacity>
      {expandedGroups[groupName] && (
        <View style={styles.userIdsContainer}>
          {userGroups[groupName].map(userId => (
            <Text key={userId} style={styles.userId}>
              {userId}
            </Text>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <SafeScreen>
      <View style={styles.usersContainer}>
        <FlatList
          data={users}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.userItem}
              onPress={() => {
                RootNavigation.navigate(ROUTES.CHAT, {
                  room: item,
                  userRoomID: userRoomID,
                  socket: socket,
                });
              }}>
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
      <View style={styles.groupsContainer}>
        <FlatList
          data={Object.keys(userGroups)}
          renderItem={renderGroupItem}
          keyExtractor={item => item}
        />
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
    bottom: 0,
    position: 'absolute',
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
