import { View, Text } from 'react-native'
import React from 'react'
import styles from './Finish.style'

const FinishScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Felicidades, terminaste el desafío.</Text>
    </View>
  )
}

export default FinishScreen