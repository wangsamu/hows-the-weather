import {
  Alert,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';
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

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        currentLocation.coords.latitude
      }&lon=${
        currentLocation.coords.longitude
      }&appid=${`2b9c8fe8863933c63c5479b28e425621`}`
    );

    console.log('response data:', response.data);

    setForecast(response.data);
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
      <Text>Weather ready!</Text>
      <Text>{forecast.name}</Text>
      <Image
        source={{
          uri: `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`,
        }}
        style={{ width: 200, height: 200 }}
      />
      <Text>{forecast.weather[0].description}</Text>
      <Text>
        temperature: {(forecast.main.temp - 273.15).toFixed(2)} Celcius
      </Text>
      <Text>wind: {forecast.wind.speed} m/s</Text>
    </View>
  );
};

export default Weather;
