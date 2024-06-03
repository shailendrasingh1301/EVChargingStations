import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import {navigationRef} from '../../navigators/helper';
import {ROUTES} from '../../utils/routes';

/**
 * Configure Google Login.
 */
GoogleSignin.configure({
  scopes: [
    'email',
    'profile',
    'https://www.googleapis.com/auth/user.phonenumbers.read',
    'https://www.googleapis.com/auth/user.addresses.read',
    'https://www.googleapis.com/auth/user.birthday.read',
    'https://www.googleapis.com/auth/user.gender.read',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ],
  webClientId:
    '693243145991-gnmne5213mcsenu05kk7pkir34trbcue.apps.googleusercontent.com',
  offlineAccess: true,
});

export const SocialLogin = {
  //Google Sign-In method
  googleLogin: async (success, failure) => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const result = await auth().signInWithCredential(googleCredential);
      const {accessToken} = await GoogleSignin.getTokens();

      const response = await axios.get(
        `https://people.googleapis.com/v1/people/me?personFields=phoneNumbers,birthdays,genders`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
        },
      );
      if (response.data) {
        navigationRef.navigate(ROUTES.TABS);
      }
      success({accessToken, result, googleCredential, idToken});
    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          break;
        case statusCodes.IN_PROGRESS:
          failure();
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          failure();
          break;
        default:
          failure();
          break;
      }
    }
  },
};
