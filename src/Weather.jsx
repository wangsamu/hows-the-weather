import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const openWeatherAPIKey = '';
const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${capitalLatitude}&lon=${capitalLongitude}&appid=${process.env.REACT_APP_API_KEY}`;

const Weather = () => {
  const [forecast, setForecast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadForecast = async () => {
    setRefreshing(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status);
    if (status !== granted) {
      Alert.alert('Permission to location data needed!');
    }

    const currentLocation = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });

    const response = await fetch(openWeatherUrl);
    const data = response.json();

    if (!reponse.ok) {
      Alert.alert('Something wet wrong!');
    }

    setRefreshing(false);
  };

  useEffect(() => loadForecast(), []);

  return (
    <View>
      <Text>Weather</Text>
    </View>
  );
};

export default Weather;
