import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
  },
  containerGoogle: {
    marginVertical: 5,
  },
  googleLoginText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  googleLogoView: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 8,
    top: 5,
  },
  googleView: {
    height: 50,
    backgroundColor: 'rgb(253,38,17)',
    width: windowWidth * 0.9,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  appLogoView: {
    marginTop: windowHeight * 0.3,
    width: '100%',
    alignItems: 'center',
    flex: 4,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  poweredByText: {
    fontWeight: Platform.OS === 'ios' ? '500' : 'bold',
    alignSelf: 'center',
    marginTop: 10,
    color: 'grey',
    textDecorationLine: 'underline',
  },
  companyNameText: {
    fontStyle: 'italic',
    fontWeight: Platform.OS === 'ios' ? '500' : 'bold',
    alignSelf: 'center',
    marginTop: 2,
    marginBottom: 20,
    color: 'grey',
  },
});

export default styles;
