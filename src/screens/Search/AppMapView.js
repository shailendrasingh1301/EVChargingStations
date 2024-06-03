import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_DEFAULT, PROVIDER_GOOGLE} from 'react-native-maps';
import GetLocation from 'react-native-get-location';

const AppMapView = () => {
  const [location, setLocation] = useState();

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setLocation(location);
      })
      .catch(error => {
        const {code, message} = error;
      });
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        provider={
          Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
        }
        showsUserLocation={true}
        // initialRegion={{
        //   latitude: location?.latitude,
        //   longitude: location?.longitude,
        //   // latitudeDelta: 0.0922,
        //   // longitudeDelta: 0.0421,
        // }}
      />
    </View>
  );
};

export default AppMapView;

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
