import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Camera } from 'expo-camera/legacy';
import * as MediaLibrary from 'expo-media-library';
import Button from './components/Button';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null); // Camera permissions
  const [image, setImage] = useState(null); // Image taken by the camera
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back); // Camera type (front or back)
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off); // Flash mode (on or off)
  const cameraRef = useRef(null); // Reference to the camera component

  // Request camera and library permissions and save the status
  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // If the permissions are not granted, show a message
  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  // If the permissions are not granted, show a message
  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  // Take a picture with the camera. If the picture is taken succesfully, save the imgage uri in the image variable
  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
      } catch (error) {
        console.log('Error taking a picture: ', error);
      }
    }
  }

  // Toggle the camera type (front or back)
  const toggleCameraType = () => {
    setCameraType(cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
  }

  // Toggle the flash mode (on or off)
  const toggleFlashMode = () => {
    setFlashMode(flashMode === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off);
  }

  // Save the picture in the library
  const savePicture = async () => {
    if (image) {
      try {
        await MediaLibrary.saveToLibraryAsync(image);
      } catch (error) {
        console.log('Error saving picture: ', error);
      } finally {
        setImage(null);
      }
    }
  }

  return (
    <View style={styles.container}>
      {!image ? // If there is no image, show the camera and the buttons
        <Camera 
          style={styles.camera}
          type={cameraType} 
          flashMode={flashMode} 
          ref={cameraRef}>
            <View style={styles.buttonsContainer}>
              <View style={styles.cameraButtonContainer}>
                <Button 
                  title="Take a picture" 
                  icon="camera" 
                  onPress={takePicture}/>
              </View>
              <View style={styles.flashButtonContainer}>
                <Button 
                  title={flashMode === Camera.Constants.FlashMode.off ? "off" : "on"} 
                  icon="flash" 
                  onPress={toggleFlashMode}
                  color={flashMode === Camera.Constants.FlashMode.off && "red"}/>
              </View>
              <View style={styles.rotateButtonContainer}>
                <Button 
                  title={cameraType === Camera.Constants.Type.back ? "front" : "back"} 
                  icon="cycle" 
                  onPress={toggleCameraType}
                />
              </View>
            </View>
        </Camera>
      : // If there is an image, show the image with the retake and save buttons
        <ImageBackground source={{uri: image}} style={styles.camera}>
          <View style={styles.buttonsContainer}>
              <View style={styles.retakeButtonContainer}>
                <Button 
                  title="Re-take" 
                  icon="retweet" 
                  onPress={() => setImage(null)}/>
              </View>
              <View style={styles.saveButtonContainer}>
                <Button 
                  title="Save" 
                  icon="check" 
                  onPress={savePicture}/>
              </View>
            </View>
        </ImageBackground>  
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
    aspectRatio: 11/16,
  },
  buttonsContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    width: '100%',
  },
  cameraButtonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  flashButtonContainer: {
    position: 'absolute',
    left: 100,
    top: 40,
  },
  rotateButtonContainer: {
    position: 'absolute',
    right: 120,
    top: 40,
  },
  retakeButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 120,
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 120,
  },
});