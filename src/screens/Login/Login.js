import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import SafeScreen from '../../components/SafeScreen';
import {SocialLogin} from './helper';
import {useDispatch} from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const [googleLoading, setGoogleLoading] = useState(false);

  const singInWithGoogleSuccess = async ({
    accessToken,
    result,
    googleCredential,
    idToken,
  }) => {
    setGoogleLoading(false);
    const {phoneNumber, email, displayName} = result.user;
  };
  const onGoogleLoginPress = () => {
    setGoogleLoading(true);
    SocialLogin.googleLogin(singInWithGoogleSuccess, () => {
      setGoogleLoading(false);
    });
  };

  return (
    <SafeScreen>
      <View style={styles.container}>
        <Text>
          Welcome back to the ultimate EV charging station finder app!
        </Text>
        <Text>
          Discover EV charging stations near you, plan your trip, and unlock
          more features with just one click!
        </Text>
        <Button title="Google SignIn" onPress={onGoogleLoginPress} />
      </View>
    </SafeScreen>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
