import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './Location.style'
import MapLocation from '../../components/MapLocation'
import * as Location from 'expo-location'

const LocationScreen = ({ navigation }) => {

  const [location, setLocation] = useState({ latitude: '', longitude: '' })

  const [error, setError] = useState(false)
  const [errorLabel, setErrorLabel] = useState('')

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({})
      setLocation({
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
      })
      setError(false)
    } else {
      setError(true)
      setErrorLabel('No fue posible acceder a tu ubicación, inténtalo de nuevo :D')
    }
  }

  return (
    <View style={styles.container}>
      {error && (
        <Text style={styles.error}>{errorLabel}</Text>
      )}
      {location.latitude != '' ? (
        <View style={styles.Coords}>
          <Text style={styles.labels}>Genial, parece que te ubicas justo aquí: </Text>
          <Text style={styles.labels}>Latitud: {location.latitude}</Text>
          <Text style={styles.labels}>Longitud: {location.longitude} </Text>
          <MapLocation latitude={location.latitude} longitude={location.longitude} />
          <Pressable
            onPress={() => navigation.navigate('FinishScreen')}
            style={styles.buttonFinish}
          >
            <Text>Finalizar</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.Coords}>
          <Text>Aún no conozco tu ubicación.</Text>
          <Pressable
            onPress={getLocation}
            style={styles.buttonLocation}
          >
            <Text>Obtener Ubicación</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('CameraScreen')}
            style={styles.buttonFinish}
          >
            <Text>Volver</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

export default LocationScreen