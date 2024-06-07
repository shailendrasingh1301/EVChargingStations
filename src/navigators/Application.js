import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '../utils/routes';
import {NavigationContainer} from '@react-navigation/native';
import HomeTabsNavigator from './Tabs';
import {navigationRef} from './helper';
import {StatusBar} from 'react-native';
import Login from '../screens/Login/Login';
import {useSelector} from 'react-redux';
import Chat from '../screens/Chat/Chat';
import ChatList from '../screens/Chat/ChatList';

const Stack = createStackNavigator();

export function ChatStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={ROUTES.CHATLIST}>
      <Stack.Screen name={ROUTES.CHATLIST} component={ChatList} />
      <Stack.Screen name={ROUTES.CHAT} component={Chat} />
    </Stack.Navigator>
  );
}

function ApplicationNavigator() {
  const {accessToken} = useSelector(state => state.userReducer);
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar backgroundColor={'#FFFFFF'} />
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={ROUTES.LOGIN}>
        <Stack.Group>
          {accessToken ? (
            <>
              <Stack.Screen name={ROUTES.TABS} component={HomeTabsNavigator} />
            </>
          ) : (
            <>
              <Stack.Screen name={ROUTES.LOGIN} component={Login} />
            </>
          )}
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
