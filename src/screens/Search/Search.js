import {StyleSheet, View} from 'react-native';
import React from 'react';
import SafeScreen from '../../components/SafeScreen';
import AppMapView from './AppMapView';

const Search = () => {
  return (
    <SafeScreen style={styles.container}>
      <AppMapView />
    </SafeScreen>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
