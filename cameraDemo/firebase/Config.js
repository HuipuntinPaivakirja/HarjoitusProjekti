import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, onSnapshot, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as FileSystem from 'expo-file-system';

const firebaseConfig = {
    apiKey: "AIzaSyCbKVGaYFzPdY6KmHqbYGU29AzJwKnYjMk",
    authDomain: "picturedemo-d7f68.firebaseapp.com",
    projectId: "picturedemo-d7f68",
    storageBucket: "picturedemo-d7f68.firebasestorage.app",
    messagingSenderId: "163019016066",
    appId: "1:163019016066:web:1f2c0479c1246629a6319b",
    measurementId: "G-BTZBF4SF7B"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  const storage = getStorage(app);

  const cameraCollection = "cameraCollection";

  // Upload image to Firebase Storage
  const uploadImage = async (imageUri) => {
    try {
        // Get the image from the file system
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                resolve(xhr.response);
            };
            xhr.onerror = (e) => {
                console.log(e);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', imageUri, true);
            xhr.send(null);
        });

        // Create a reference to the location where the image will be saved
        const storageRef = ref(storage, 'images/' + new Date().toISOString());

        // Upload the image to the location
        const snapshot = await uploadBytesResumable(storageRef, blob);

        // Get the download URL
        const url = await getDownloadURL(snapshot.ref);

        console.log('Uploaded image with URL : ', url);

        return url;
    } catch (error) {
        console.error('Error uploading image:', error);
    }
  };
  
  // Save image to Firestore database
  const saveImageToFirestore = async (imageUri) => {
    try {
        const url = await uploadImage(imageUri);
        const docRef = await addDoc(collection(db, cameraCollection), {
            url: url,
            created: new Date().toISOString(),
            name: "Image" + new Date().toISOString()
        });
        console.log('Image added with ID: ', docRef.id);
    } catch (error) {
        console.error('Error adding image:', error);
    }

  };

  // Retrieve all images from Firestore database as an array of objects
  const retrieveAllImages = async () => {
    try {
        const images = [];
        const querySnapshot = await getDocs(collection(db, cameraCollection));
        querySnapshot.forEach((doc) => {
            console.log(`Image: ${doc.id} => ${doc.data().url}`);
            images.push({
                id: doc.id,
                url: doc.data().url,
                name: doc.data().name,
            });
        });
        // Return all images in the collection as an array of objects
        return images;
    } catch (error) {
        console.error('Error retrieving images:', error);
        return [];
    }
  };

  export {
    db,
    cameraCollection,
    collection,
    addDoc,
    query,
    onSnapshot,
    deleteDoc,
    doc,
    saveImageToFirestore,
    retrieveAllImages,
  }