import { View, Text } from 'react-native';
import React, { useState } from 'react';
import * as Location from 'expo-location';

const openWeatherAPIKey = '';
const openWeatherUrl = '';

const Weather = () => {
  const [forecast, setForecast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadForecast = async () => {
    setRefreshing(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
  };
  return (
    <View>
      <Text>Weather</Text>
    </View>
  );
};

export default Weather;
