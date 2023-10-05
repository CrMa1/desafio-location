import { View, Text, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import styles from './Camera.style'
import * as ImagePicker from 'expo-image-picker'

const CameraScreen = ({ navigation }) => {

  const [error, setError] = useState(false)
  const [errorLabel, setErrorLabel] = useState('')

  const [image, setImage] = useState('https://www.petlife.mx/u/fotografias/m/2023/4/27/f768x1-1509_1636_5050.jpg')
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const verifyCamPerms = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync()
    if (!granted) {
      setErrorLabel('Si no me das acceso, no cuenta mi desafío :c')
      setError(true)
      return false
    } else {
      setError(false)
      return true
    }
  }

  const takePhoto = async () => {
    const isCamOk = await verifyCamPerms()
    if (isCamOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [9, 16],
        base64: true,
        quality: 0.5,
      })
      if (!result.canceled) {
        setError(false)
        setIsImageLoaded(true)
        setImage(`data:image/jpeg;base64,${result.assets[0].base64}`)
      } else {
        if (isImageLoaded) {
          setErrorLabel('Bueno, al menos ya tomaste una, puedes continuar :D')
          setError(true)
        }else{
          setErrorLabel("Cancelaste :( pero no te preocupes, puedes tomar otra")
          setError(true)
        }
      }
    }
  }

  const checkPhoto = () => {
    if (isImageLoaded) {
      setError(false)
      navigation.navigate('LocationScreen')
    } else {
      setErrorLabel('Primero debes tomarte una fotito :D')
      setError(true)
    }
  }

  return (
    <View style={styles.container}>
      {error && (
        <Text style={styles.error}>{errorLabel}</Text>
      )}
      <Image
        source={{
          uri: image
        }}
        style={styles.image}
        resizeMode='cover'
      />
      <Pressable
        onPress={takePhoto}
        style={styles.pickImage}
      >
        <Text>Cambiar imágen</Text>
      </Pressable>
      <Pressable
        onPress={checkPhoto}
        style={styles.nextScreen}
      >
        <Text>Continuar</Text>
      </Pressable>
    </View>
  )
}

export default CameraScreen