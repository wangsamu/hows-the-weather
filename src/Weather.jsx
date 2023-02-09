import {
  Alert,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';
// import { REACT_APP_API_KEY } from '@env';

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ecf0f1',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
  },
  currentWeather: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',

    backgroundColor: 'red',
  },
  largeIcon: { width: 300, height: 250 },
  currentTemperature: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  currentDescription: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 24,
    marginBottom: 5,
  },
  extraInfo: {},
  info: {},
});

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

    const response = await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          currentLocation.coords.latitude
        }&lon=${
          currentLocation.coords.longitude
        }&appid=${`2b9c8fe8863933c63c5479b28e425621`}`
      )
      .catch((error) => console.log(error));

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
    <SafeAreaView style={styles.container}>
      <View style={{ height: 120, flexGrow: 0 }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadForecast()}
            />
          }
          style={{
            marginTop: 50,
            backgroundColor: 'green',
          }}
        >
          <Text style={styles.title}>Current Weather</Text>
          <Text style={{ alignItems: 'center', textAlign: 'center' }}>
            {forecast.name}
          </Text>
        </ScrollView>
      </View>

      <View style={styles.currentWeather}>
        <Image
          source={{
            uri: `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`,
          }}
          style={styles.largeIcon}
        />
        <Text style={styles.currentTemperature}>
          {(forecast.main.temp - 273.15).toFixed(2)} ᵒC
        </Text>
      </View>

      <Text style={styles.currentDescription}>
        {forecast.weather[0].description}
      </Text>

      <View style={styles.extraInfo}>
        <View style={styles.info}>
          <Text>wind: {forecast.wind.speed} m/s</Text>
        </View>

        <View style={styles.info}>
          <Text>wind: {forecast.wind.speed} m/s</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Weather;
