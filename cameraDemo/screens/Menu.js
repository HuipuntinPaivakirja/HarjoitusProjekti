import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Button from '../components/Button'

export default function Menu({ navigation }) {
    const goToCamera = () => {
        navigation.navigate('Camera');
    }

    const goToGallery = () => {
        navigation.navigate('Gallery');
    }

    return (
        <View style={styles.container}>
            <View styles={styles.buttonContainer}>
                <View style={styles.cameraScreenButton}>
                    <Button icon="camera" color="black" onPress={goToCamera}/>
                </View>
                <Button icon="image" color="black" onPress={goToGallery}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainer: {
      flexDirection: 'column',
      justifyContent: 'space-around',
      width: '50%',
    },
    cameraScreenButton: {
      marginBottom: 20,
    },
  });