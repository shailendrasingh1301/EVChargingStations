import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';

import {Images} from '../assets/Images';
import {ROUTES} from '../utils/routes';
import Search from '../screens/Search/Search';
import Favourite from '../screens/Favourite/Favourite';
import Profile from '../screens/Profile/Profile';
import {COLORS} from '../utils/colors';

const {width, height} = Dimensions.get('window'),
  TAB_BAR_WIDTH = width / 5;

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
  },
  innerView: {
    paddingVertical: Math.floor(height * 0.022),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    width: TAB_BAR_WIDTH,
    textAlign: 'center',
  },
  iconSize: {
    height: 24,
    width: 24,
  },
});

const getTabIcon = ({tabName, isFocused}) => {
  switch (tabName) {
    case ROUTES.SEARCH: {
      return Images.SearchIcon;
    }
    case ROUTES.FAVOURITES: {
      return Images.FilledHeartIcon;
    }
    case ROUTES.PROFILE: {
      return Images.profileActiveIcon;
    }
    default:
      return Images.HeartIcon;
  }
};
const TabBar = ({state, descriptors, navigation}) => {
  console.log('state, descriptors, navigation', state, descriptors, navigation);
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.tabBarLabel || route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const imageSource = getTabIcon({
          tabName: route.name,
          isFocused,
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}
            key={index}>
            <View style={styles.innerView}>
              <Image
                style={{
                  height: 25,
                  width: 25,
                  tintColor: isFocused ? COLORS.green : COLORS.gray200,
                }}
                resizeMode={'contain'}
                source={imageSource}
              />
              <Text
                style={{
                  color: isFocused ? COLORS.green : COLORS.gray200,
                  fontSize: 10,
                  paddingTop: 3,
                }}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const HomeTabsNavigator = () => {
  return (
    <>
      <Tab.Navigator
        tabBar={props => <TabBar {...props} />}
        initialRouteName={ROUTES.HOME}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
          },
        }}>
        <Tab.Screen
          name={ROUTES.SEARCH}
          component={Search}
          options={{
            tabBarLabel: 'Search',
          }}
        />
        <Tab.Screen
          name={ROUTES.FAVOURITES}
          component={Favourite}
          options={{
            tabBarLabel: 'Favourite',
          }}
        />
        <Tab.Screen
          name={ROUTES.PROFILE}
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default HomeTabsNavigator;
