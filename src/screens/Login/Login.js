// const Login = () => {
//   const dispatch = useDispatch();
//   const [googleLoading, setGoogleLoading] = useState(false);

//   const singInWithGoogleSuccess = async ({
//     accessToken,
//     result,
//     googleCredential,
//     idToken,
//   }) => {
//     dispatch(setAccessToken(accessToken));
//     setGoogleLoading(false);
//     const {phoneNumber, email, displayName} = result.user;
//   };
//   const onGoogleLoginPress = () => {
//     setGoogleLoading(true);
//     SocialLogin.googleLogin(singInWithGoogleSuccess, () => {
//       setGoogleLoading(false);
//     });
//   };

//   return (
//     <SafeScreen>
//       <View style={styles.container}>
//         <Text>
//           Welcome back to the ultimate EV charging station finder app!
//         </Text>
//         <Text>
//           Discover EV charging stations near you, plan your trip, and unlock
//           more features with just one click!
//         </Text>
//         <Button title="Google SignIn" onPress={onGoogleLoginPress} />
//       </View>
//     </SafeScreen>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  Image,
  Platform,
  Text,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from './styles';
import {Images} from '../../assets/Images';
import {SocialLogin} from './helper';
import {useDispatch} from 'react-redux';
import {setAccessToken} from '../../store/slices/userSlice';
import SafeScreen from '../../components/SafeScreen';

const Login = () => {
  const dispatch = useDispatch();
  const [googleLoading, setGoogleLoading] = useState(false);

  const singInWithGoogleSuccess = async ({
    accessToken,
    result,
    googleCredential,
    idToken,
  }) => {
    dispatch(setAccessToken(accessToken));
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
      <ImageBackground style={styles.container} source={Images.BackgroundImage}>
        <View style={styles.appLogoView}>
          <Image style={styles.logo} source={Images.Logo} />
        </View>
        <View style={styles.containerGoogle}>
          <TouchableOpacity
            style={styles.googleView}
            onPress={onGoogleLoginPress}>
            <View style={styles.googleLogoView}>
              <Image
                source={Images.DriveIcon}
                style={{width: 30, height: 30}}
              />
            </View>
            {googleLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text
                style={[
                  styles.googleLoginText,
                  {fontWeight: Platform.OS === 'ios' ? '500' : 'bold'},
                ]}>
                Connect to your Google Drive
              </Text>
            )}
          </TouchableOpacity>

          <Text style={styles.poweredByText}>Powered By</Text>
          <Text style={styles.companyNameText}>Microsys & Equipments</Text>
        </View>
      </ImageBackground>
    </SafeScreen>
  );
};

export default Login;
