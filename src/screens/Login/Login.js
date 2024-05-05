import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeScreen from '../../components/SafeScreen';

const Login = () => {
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
