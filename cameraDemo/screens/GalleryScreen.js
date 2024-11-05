import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { retrieveAllImages } from '../firebase/Config';

export default function GalleryScreen() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const retrievedImages = await retrieveAllImages();
        console.log('Retrieved images:', retrievedImages);
        setImages(retrievedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);


  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        {images.length > 0 && images.map((image, index) => (
          <View key={index} style={styles.imageObject}>
            <Image key={index} source={{ uri: image.url }} style={styles.image} />
            <Text>{image.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    margin: 10,
  },
  imageObject: {
    flexDirection: 'column',
  },

});