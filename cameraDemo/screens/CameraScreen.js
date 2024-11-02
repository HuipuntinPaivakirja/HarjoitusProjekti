import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera'; //Updated from legacy to new version, useCameraPermissions is now a hook
import * as MediaLibrary from 'expo-media-library';
import Button from '../components/Button';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions(); // New hook from expo-camera
  const [image, setImage] = useState(null);
  const [cameraType, setCameraType] = useState('back'); // Camera type (front or back)
  const [flashMode, setFlashMode] = useState('off'); // Flash mode (on or off)
  const cameraRef = useRef(null);

  // Handle permissions not granted
  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to use the camera</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  // Take a picture with the camera. If the picture is taken succesfully, save the imgage uri in the image variable
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
      } catch (error) {
        console.log('Error taking a picture: ', error);
      }
    }
  };

  // Toggle the camera type (front or back)
  const toggleCameraType = () => {
    setCameraType((current) => (current === 'back' ? 'front' : 'back'));
  };

  // Toggle the flash mode (on or off)
  const toggleFlashMode = () => {
    setFlashMode((current) => (current === 'off' ? 'on' : 'off'));
  };

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
  };

  return (
    <View style={styles.container}>
      {!image ?  // If there is no image, show the camera and the buttons
        <CameraView
          style={styles.camera}
          ref={cameraRef}
          facing={cameraType} 
          flash={flashMode} 
        >
          <View style={styles.buttonsContainer}>
            <View style={styles.cameraButtonContainer}>
              <Button title="Take a picture" icon="camera" onPress={takePicture} />
            </View>
            <View style={styles.flashButtonContainer}>
              <Button
                title={flashMode === 'off' ? 'Flash Off' : 'Flash On'}
                icon="flash"
                onPress={toggleFlashMode}
                color={flashMode === 'off' ? 'red' : 'white'}
              />
            </View>
            <View style={styles.rotateButtonContainer}>
              <Button
                title={cameraType === 'back' ? 'Front Camera' : 'Back Camera'}
                icon="cycle"
                onPress={toggleCameraType}
              />
            </View>
          </View>
        </CameraView>
       : // If there is an image, show the image with the retake and save buttons
        <ImageBackground source={{ uri: image }} style={styles.camera}>
          <View style={styles.buttonsContainer}>
            <View style={styles.retakeButtonContainer}>
              <Button title="Re-take" icon="retweet" onPress={() => setImage(null)} />
            </View>
            <View style={styles.saveButtonContainer}>
              <Button title="Save" icon="check" onPress={savePicture} />
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
    aspectRatio: 11 / 16,
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
