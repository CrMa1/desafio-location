import { View, Image } from 'react-native'
import React from 'react'
import styles from './MapLocation.style'

const MapLocation = ({latitude,longitude}) => {
    const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=13&size=600x300&maptype=roadmap&markers=color:red|${latitude},${longitude}&key=AIzaSyD9m_dhWzZ78UTBYnkMRicSiEaKK8sVIK8`
  return (
    <>
      <Image 
        style={styles.mapImage}
        source={{
            uri: mapPreviewUrl
        }}
      />
    </>
  )
}

export default MapLocation