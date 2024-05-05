import {SafeAreaView, StatusBar} from 'react-native';
import {COLORS} from '../utils/colors';

function SafeScreen({children, safeViewStyle}) {
  return (
    <SafeAreaView
      style={[{backgroundColor: COLORS.WHITE, flex: 1}, safeViewStyle]}>
      <StatusBar barStyle={'dark-content'} />
      {children}
    </SafeAreaView>
  );
}

export default SafeScreen;
