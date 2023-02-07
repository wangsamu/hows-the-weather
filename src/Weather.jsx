import {
  Alert,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
// import { REACT_APP_API_KEY } from '@env';

const Weather = () => {
  const [forecast, setForecast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadForecast = async () => {
    setRefreshing(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status);
    if (status !== 'granted') {
      Alert.alert('Permission to location data needed!');
    }

    const currentLocation = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    console.log(currentLocation);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        currentLocation.coords.latitude
      }&lon=${
        currentLocation.coords.longitude
      }&appid=${`2b9c8fe8863933c63c5479b28e425621`}`
    );
    const data = response.json();
    console.log('response:', response);

    if (!response.ok) {
      Alert.alert('Something wet wrong!');
    } else {
      setForecast(data);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    loadForecast();
  }, []);

  console.log('patata');
  if (!forecast) {
    return (
      <SafeAreaView style={StyleSheet.loading}>
        <ActivityIndicator size='large' color='pink' />
        <Text>Loading weather data...</Text>
      </SafeAreaView>
    );
  }
  return (
    <View>
      <Text>Weather ready! ☀</Text>
    </View>
  );
};

export default Weather;
