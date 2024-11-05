import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
    uploading: {
      position: 'absolute',
      alignSelf: 'center',
      bottom: 100,
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
    },
  });
  
export default styles;