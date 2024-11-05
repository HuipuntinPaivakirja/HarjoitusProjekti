import { View, ImageBackground,} from 'react-native'
import React from "react";
import Button from './Button'
import styles from '../styles/CameraAndImageStyles'
import DrawLine from './DrawLine';



export default function ImagePreview({ image, setImage, savePicture }) {
 

  return (
    // Display the image in the background with the retake and save buttons on top
    <ImageBackground source={{ uri: image }} style={styles.camera}>
      <DrawLine/>
        <View style={styles.buttonsContainer}>
          <View style={styles.retakeButtonContainer}>
            <Button title="Re-take" icon="retweet" onPress={() => setImage(null)} />
          </View>
          <View style={styles.saveButtonContainer}>
            <Button title="Save" icon="check" onPress={savePicture} />
          </View>
        </View>
    </ImageBackground>
  );
}

