import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '../utils/routes';
import {NavigationContainer} from '@react-navigation/native';
import HomeTabsNavigator from './Tabs';
import {navigationRef} from './helper';
import {StatusBar} from 'react-native';
import Login from '../screens/Login/Login';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();
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
