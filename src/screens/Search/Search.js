import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeScreen from '../../components/SafeScreen';
import MapView from 'react-native-maps';

const Search = () => {
  return (
    <SafeScreen>
      <View style={styles.container}>
        <Text>Search</Text>
        <MapView style={styles.mapView} />
      </View>
    </SafeScreen>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
