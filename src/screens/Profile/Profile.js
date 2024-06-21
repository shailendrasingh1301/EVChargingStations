import {StyleSheet, View, Button} from 'react-native';
import React from 'react';
import SafeScreen from '../../components/SafeScreen';
import {SocialLogin} from '../Login/helper';
import {useDispatch} from 'react-redux';
import {setAccessToken} from '../../store/slices/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    SocialLogin.googleLogout(
      () => {
        dispatch(setAccessToken(''));
        console.log('Logged out successfully');
      },
      error => {
        console.error('Logout failed', error);
      },
    );
  };
  return (
    <SafeScreen>
      <View>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </SafeScreen>
  );
};

export default Profile;

const styles = StyleSheet.create({});
